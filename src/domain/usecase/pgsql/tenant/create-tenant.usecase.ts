import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { CryptoGateway } from '@/domain/contracts/gateways/crypto.gateway';
import {
  IRoleRepository,
  ISessionRepository,
  IUserRepository,
} from '@/domain/contracts/pgsql/repositories';
import { IPlanRepository } from '@/domain/contracts/pgsql/repositories/plan.repository.interface';
import {
  CreateTenantInput,
  ITenantRepository,
} from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { AuthOutputDto } from '@/main/controllers/auth/dto';
import { SessionSource } from '@/shared/enums';
import { generateSlug } from '@/shared/utils/generate-slug';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export type CreateTenantUseCase = (
  input: CreateTenantInput,
) => Promise<AuthOutputDto>;

export type CreateTenantUseCaseFactory = (
  usersRepo: IUserRepository,
  sessionRepo: ISessionRepository,
  planRepo: IPlanRepository,
  roleRepo: IRoleRepository,
  tenantRepo: ITenantRepository,
  jwtService: IJwtService,
  crypto: CryptoGateway,
) => CreateTenantUseCase;

export const createTenantUseCase: CreateTenantUseCaseFactory =
  (
    usersRepo,
    sessionRepo,
    planRepo,
    roleRepo,
    tenantRepo,
    jwtService,
    crypto,
  ) =>
  async (input) => {
    const tenantExist = await tenantRepo.findOneBy({ name: input.tenant_name });

    if (tenantExist) {
      throw new BadRequestException(
        `Tenant "${input.tenant_name}" already exists`,
      );
    }

    const plan = await planRepo.findOneBy({ id: input?.plan ?? 'free' });

    if (!plan) {
      throw new BadRequestException(`Plan "${input?.plan}" not found`);
    }

    const tenant = await tenantRepo.create({
      name: generateSlug(input.tenant_name),
      plan: { id: plan.id },
      status: 'active',
    });

    if (!tenant) {
      throw new BadRequestException('Failed to create tenant');
    }
    const userExists = await usersRepo.findOneByWithRelation({
      where: {
        email: input.email,
        tenant: { id: tenant.id },
      },
      relations: ['tenant'],
    });

    if (userExists) {
      throw new BadRequestException('Failed to create tenant');
    }

    const role = await roleRepo.findOneBy({ name: 'admin' });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const passwordHashed = await crypto.hash(input.password);

    const user = await usersRepo.create({
      email: input.email,
      first_name: input.first_name,
      last_name: input.last_name,
      password: passwordHashed,
      tenant: { id: tenant.id },
      role: { id: role.id },
    });

    const token = await jwtService.generateTokens({
      sub: {
        user_id: user.id,
        email: user.email,
        role: user.role.name,
        tenant: user.tenant?.name,
        source: SessionSource.JWT,
      },
    });

    const session = await sessionRepo.create({
      ...token,
      source: SessionSource.JWT,
      source_id: uuidv4(),
      user: { id: user.id },
      tenant: { id: tenant.id },
    });

    return plainToInstance(
      AuthOutputDto,
      {
        ...user,
        ...session,
        role: user.role.name,
      },
      { excludeExtraneousValues: true },
    );
  };
