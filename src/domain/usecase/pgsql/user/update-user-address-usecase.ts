import { Payload } from '@/domain/contracts/auth/jwt';
import {
  IAddressRepository,
  IUserRepository,
} from '@/domain/contracts/pgsql/repositories';
import { UpdateAddressDto } from '@/infrastructure/http/dtos/address/update-address-data.dto';

import { plainToInstance } from 'class-transformer';

export type UpdateUserAddressUseCase = (input: {
  user_id: string;
  address: UpdateAddressDto;
  currentUser: Payload['sub'];
}) => Promise<UpdateAddressDto | undefined>;

export type UpdateUserAddressUseCaseFactory = (
  addressRepo: IAddressRepository,
  usersRepo: IUserRepository,
) => UpdateUserAddressUseCase;

export const createUpdateUserAddressUseCase: UpdateUserAddressUseCaseFactory =
  (addressRepo, usersRepo) => async (input) => {
    if (!input.address?.zip_code) {
      throw new Error('user not found');
    }
    const user = await usersRepo.findOneByWithRelation({
      where: { id: input.user_id, tenant: { name: input.currentUser.tenant } },
      relations: ['tenant', 'addresses'],
    });

    if (!user) {
      throw new Error('user not found');
    }

    const address = input.address?.id
      ? await addressRepo.update(input.address.id, input.address)
      : await addressRepo.create({
          user,
          ...input.address,
          is_default: true,
        });
    console.log('🚀 ~ createUpdateUserAddressUseCase ~ address:', address);

    if (input?.address?.is_default) {
      const addressesDefault = user.addresses.filter(
        (a) => a.is_default === true && a.id !== address.id,
      );

      if (addressesDefault) {
        for (const a of addressesDefault) {
          await addressRepo.update(a.id, {
            is_default: false,
          });
        }
      }
    }

    return plainToInstance(UpdateAddressDto, address, {
      excludeExtraneousValues: true,
    });
  };
