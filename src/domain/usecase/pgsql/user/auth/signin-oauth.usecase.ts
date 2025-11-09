import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { PgsqlRole } from '@/domain/contracts/pgsql/entities';
import {
  IRoleRepository,
  ISessionRepository,
  IUserOAuthRepository,
  SigninOauth,
} from '@/domain/contracts/pgsql/repositories';
import { ITenantRepository } from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { AuthOutputDto } from '@/main/controllers/auth/dto';
import { Role, SessionSource, TenantStatus, UserStatus } from '@/shared/enums';
import { removeUndefined } from '@/shared/utils/remove-undefined';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export type SigninOauthUseCase = (input: SigninOauth) => Promise<AuthOutputDto>;

export type OauthUseCaseFactory = (
  usersRepo: IUserOAuthRepository,
  sessionRepo: ISessionRepository,
  roleRepo: IRoleRepository,
  tenantRepo: ITenantRepository,
  jwtService: IJwtService,
) => SigninOauthUseCase;

export const createSigninOAuthUseCase: OauthUseCaseFactory =
  (usersRepo, sessionRepo, roleRepo, tenantRepo, jwtService) =>
  async (input) => {
    const { sessionOptions, userOptions, tenant: tenant_name } = input;
    try {
      const tenant = await tenantRepo.findOneByWithRelation({
        where: { name: tenant_name },
        relations: ['plan', 'users'],
      });

      if (!tenant)
        throw new NotFoundException(`Tenant "${tenant_name}" not found`);

      if (tenant?.status !== TenantStatus.ACTIVE) {
        throw new BadRequestException(`Entre em contato com o suporte.`);
      }
      if (!tenant.plan) {
        throw new BadRequestException('Plano inválido ou não encontrado');
      }

      const userExists = await usersRepo.findOneByWithRelation({
        where: { email: userOptions.email, tenant: { id: tenant.id } },
        relations: ['tenant', 'role'],
      });

      if (!userExists) {
        const totalUsers = tenant?.users?.length ?? 0;
        const maxUsers = tenant.plan.max_users ?? 0;

        if (totalUsers >= maxUsers) {
          throw new BadRequestException(
            `O plano "${tenant.plan.name}" atingiu o limite máximo de usuários (${tenant.plan.max_users}).`,
          );
        }
      }

      if (userExists && userExists?.status !== UserStatus.ACTIVE) {
        throw new BadRequestException(
          `Sua conta está desativada ou suspensa. Entre em contato com o suporte.`,
        );
      }

      let role: PgsqlRole | null = userExists?.role ?? null;

      if (!role) {
        role = await roleRepo.findOneBy({ name: Role.USER });
        if (!role) throw new NotFoundException(`Role not found`);
      }

      const cleanData = removeUndefined({ ...userOptions });

      const user = userExists?.id
        ? await usersRepo.update(userExists.id, {
            ...cleanData,
            avatar_url: userExists.avatar_url,
          })
        : await usersRepo.create({
            ...cleanData,
            role: { id: role.id },
            tenant: { id: tenant.id },
          });

      if (!user?.id) {
        throw new InternalServerErrorException(
          'Erro ao salvar dados do usuário',
        );
      }

      const token = await jwtService.generateTokens({
        sub: {
          user_id: user.id,
          email: user.email,
          role: role.name,
          source: SessionSource.JWT,
          tenant: tenant.name,
        },
      });

      const sessionExist = await sessionRepo.findOneByPayload({
        sub: {
          email: userOptions.email,
          tenant: tenant_name,
          source: sessionOptions.source,
        },
      });

      if (sessionExist) {
        await sessionRepo.update(sessionExist.id, {
          ...sessionOptions,
          user_id: user.id,
        });
      }

      if (sessionExist?.source !== SessionSource.JWT) {
        const sessionExistJwt = await sessionRepo.findOneByPayload({
          sub: {
            email: userOptions.email,
            tenant: tenant_name,
            source: SessionSource.JWT,
          },
        });

        if (sessionExistJwt) {
          await sessionRepo.update(sessionExistJwt.id, {
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            user_id: user.id,
          });
        }

        if (!sessionExistJwt) {
          await sessionRepo.create({
            ...sessionOptions,
            tenant_id: tenant.id,
            user_id: user.id,
          });
          await sessionRepo.create({
            ...sessionOptions,
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            source: SessionSource.JWT,
            tenant_id: tenant.id,
            user_id: user.id,
          });
        }
      }

      const userUpdated = {
        ...user,
        ...token,
        role: role.name,
      };

      return plainToInstance(AuthOutputDto, userUpdated, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  };
