import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { PgsqlAddress } from '@/domain/contracts/pgsql/entities';
import {
  IAddressRepository,
  IRoleRepository,
  IUserRepository,
} from '@/domain/contracts/pgsql/repositories';
import { PgsqlRoleM } from '@/infrastructure/database/pgsql';
import { UpdateUserInputDto } from '@/main/controllers/user/dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export type UpdateUserUseCase = (input: {
  user_id: string;
  data: UpdateUserInputDto;
  tenant: string;
  file?: Express.Multer.File;
}) => Promise<void>;

export type UpdateUserUseCaseFactory = (
  usersRepo: IUserRepository,
  addressRepo: IAddressRepository,
  roleRepo: IRoleRepository,
  awsS3: IAwsService,
) => UpdateUserUseCase;

export const createUpdateUserUseCase: UpdateUserUseCaseFactory =
  (usersRepo, addressRepo, roleRepo, awsS3) =>
  async ({ user_id, data, file, tenant }) => {
    let avatar_url: string | undefined;
    if (file) {
      avatar_url = `avatar/${user_id}.${file.originalname.split('.').pop()}`;

      await awsS3.upload({
        key: avatar_url,
        buffer: file.buffer,
        contentType: file.mimetype,
      });
    }

    const userExists = await usersRepo.findOneByWithRelation({
      where: { id: user_id, tenant: { name: tenant } },
      relations: ['role', 'tenant', 'addresses'],
    });

    if (!userExists) {
      throw new BadRequestException('user not found');
    }

    const { address: addressData, role: role_name, ...userData } = data;

    let role: PgsqlRoleM | undefined = userExists.role;

    if (role_name) {
      const roleExist = await roleRepo.findOneBy({ name: role_name });
      role = roleExist ?? undefined;
    }

    let address: PgsqlAddress | undefined = addressData as PgsqlAddress;

    if (addressData?.zip_code) {
      if (addressData?.is_default) {
        const addressesDefault = userExists.addresses.filter(
          (a) => a.is_default,
        );

        if (addressesDefault) {
          for (const a of addressesDefault) {
            await addressRepo.update(a.id, {
              is_default: false,
            });
          }
        }
      }

      if (address?.id)
        address = await addressRepo.update(address.id, {
          ...address,
        });

      if (!address?.id)
        address = await addressRepo.create({
          ...address,
          user: userExists,
          is_default: true,
        });
    }

    await usersRepo.update(user_id, {
      ...userData,
      avatar_url,
      role,
    });

    const updatedUser = await usersRepo.findOneByWithRelation({
      where: { id: user_id },
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    if (updatedUser?.avatar_url) {
      if (updatedUser.avatar_url.startsWith('https://')) {
        avatar_url = updatedUser.avatar_url;
      } else {
        avatar_url = await awsS3.getImage(updatedUser.avatar_url);
      }
    }
  };
