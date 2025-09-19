import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { CryptoGateway } from '@/domain/contracts/gateways/crypto.gateway';
import {
  IRoleRepository,
  ISessionRepository,
  IUserAuthRepository,
  SignupInput,
} from '@/domain/contracts/pgsql/repositories';
import { IPlanRepository } from '@/domain/contracts/pgsql/repositories/plan.repository.interface';
import { ITenantRepository } from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { AuthOutputDto } from '@/main/controllers/auth/dto';
import { SessionSource } from '@/shared/enums';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export type SignupUseCase = (input: SignupInput) => Promise<AuthOutputDto>;

export type SignupUseCaseFactory = (
  usersRepo: IUserAuthRepository,
  sessionRepo: ISessionRepository,
  planRepo: IPlanRepository,
  tenantRepo: ITenantRepository,
  roleRepo: IRoleRepository,
  jwtService: IJwtService,
  crypto: CryptoGateway,
) => SignupUseCase;

export const createSignupUseCase: SignupUseCaseFactory =
  (
    usersRepo,
    sessionRepo,
    planRepo,
    tenantRepo,
    roleRepo,
    jwtService,
    crypto,
  ) =>
  async (input) => {
    const {
      email,
      password,
      first_name,
      last_name,
      tenant: tenant_name,
    } = input;

    const tenant = await tenantRepo.findOneByWithRelation({
      where: {
        name: tenant_name,
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
      where: { email, tenant: { id: tenant.id } },
      relations: ['tenant'],
    });

    if (userExists) {
      throw new BadRequestException('User already exists with this email');
    }

    const role = await roleRepo.findOneBy({ name: 'user' });

    if (!role) {
      throw new NotFoundException('Role padrão "user" não encontrada');
    }

    const passwordHashed = await crypto.hash(password);

    const user = await usersRepo.create({
      email,
      first_name,
      last_name,
      password: passwordHashed,
      tenant: { id: tenant.id },
      role: { id: role.id },
    });

    if (!user || !user?.id) {
      throw new InternalServerErrorException('Error saving user data');
    }

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
      user,
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
