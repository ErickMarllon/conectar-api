import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { CryptoGateway } from '@/domain/contracts/gateways/crypto.gateway';
import {
  IAddressRepository,
  IRoleRepository,
  IUserAuthRepository,
} from '@/domain/contracts/pgsql/repositories';
import { ITenantRepository } from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { PgsqlAddressM } from '@/infrastructure/database/pgsql';
import { UserUpdateOutputDto } from '@/main/controllers/user/dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

type CreateUserInput = {
  first_name: string;
  last_name: string;
  email: string;
  tenant: string;
  password?: string;
  role?: string;
  file?: Express.Multer.File;
  address?: Partial<PgsqlAddressM>;
};

export type CreateUserUseCase = (
  input: CreateUserInput,
) => Promise<UserUpdateOutputDto>;

export type CreateUserUseCaseFactory = (
  usersRepo: IUserAuthRepository,
  addressRepo: IAddressRepository,
  roleRepo: IRoleRepository,
  tenantRepo: ITenantRepository,
  awsS3: IAwsService,
  crypto: CryptoGateway,
) => CreateUserUseCase;

export const createUserUseCase: CreateUserUseCaseFactory =
  (usersRepo, addressRepo, roleRepo, tenantRepo, awsS3, crypto) =>
  async (input) => {
    const tenant = await tenantRepo.findOneByWithRelation({
      where: {
        name: input.tenant,
      },
      relations: ['plan'],
    });

    if (!tenant || !tenant.plan) {
      throw new BadRequestException(
        'Tenant ou Plano inválido ou não encontrado',
      );
    }

    const tenantUsers = await tenantRepo.findAllRaw({ id: tenant.id });
    const totalUsers = tenantUsers ? tenantUsers?.length : 0;

    if (tenant.plan.max_users !== null && totalUsers >= tenant.plan.max_users) {
      throw new BadRequestException(
        `O plano "${tenant.plan.name}" atingiu o limite máximo de usuários (${tenant.plan.max_users}).`,
      );
    }

    const userExists = await usersRepo.findOneByWithRelation({
      where: { email: input.email, tenant: { id: tenant.id } },
      relations: ['tenant'],
    });

    if (userExists) {
      throw new BadRequestException('User already exists with this email');
    }

    const roleName = input?.role ?? 'user';
    const role = await roleRepo.findOneBy({ name: roleName });

    if (!role) {
      throw new NotFoundException(`role ${roleName} not found`);
    }

    const passwordHashed =
      input.password && (await crypto.hash(input.password));

    const user = await usersRepo.create({
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      ...((passwordHashed && { password: passwordHashed }) ?? undefined),
      tenant: { id: tenant.id },
      role: { id: role.id },
    });

    if (input.address) {
      await addressRepo.create({
        user,
        ...input.address,
        is_default: true,
      });
    }

    let avatar_url: string | undefined;

    if (input.file) {
      avatar_url = `avatar/${user.id}.${input.file.originalname.split('.').pop()}`;

      await awsS3.upload({
        key: avatar_url,
        buffer: input.file.buffer,
        contentType: input.file.mimetype,
      });
    }

    await usersRepo.update(user.id, { avatar_url });

    avatar_url = await awsS3.getImage(avatar_url);

    return plainToInstance(
      UserUpdateOutputDto,
      {
        ...user,
        avatar_url,
        role: user.role.name,
      },
      { excludeExtraneousValues: true },
    );
  };
