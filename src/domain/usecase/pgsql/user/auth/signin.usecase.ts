import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { CryptoGateway } from '@/domain/contracts/gateways/crypto.gateway';
import {
  ISessionRepository,
  IUserAuthRepository,
  SigninInput,
} from '@/domain/contracts/pgsql/repositories';
import { AuthOutputDto } from '@/main/controllers/auth/dto';
import { SessionSource } from '@/shared/enums';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export type SigninUseCase = (input: SigninInput) => Promise<AuthOutputDto>;

export type SigninUseCaseFactory = (
  usersRepo: IUserAuthRepository,
  sessionRepo: ISessionRepository,
  jwtService: IJwtService,
  crypto: CryptoGateway,
  awsS3: IAwsService,
) => SigninUseCase;

export const createSigninUseCase: SigninUseCaseFactory =
  (usersRepo, sessionRepo, jwtService, crypto, awsS3) => async (input) => {
    const { email, password, tenant: tenant_name } = input;

    if (!tenant_name) {
      throw new BadRequestException('Tenant is required');
    }

    const userExists = await usersRepo.findOneByWithRelation({
      where: {
        email,
        tenant: { name: tenant_name },
      },
      relations: ['tenant', 'role'],
    });

    if (!userExists || !userExists.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await crypto.verify(userExists.password, password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await jwtService.generateTokens({
      sub: {
        user_id: userExists.id,
        email: userExists.email,
        role: userExists.role.name,
        source: SessionSource.JWT,
        tenant: userExists.tenant.name,
      },
    });

    const sessionExist = await sessionRepo.findOneByPayload({
      sub: {
        user_id: userExists.id,
        email,
        tenant: tenant_name,
        source: SessionSource.JWT,
      },
    });

    if (!sessionExist) {
      await sessionRepo.create({
        source: SessionSource.JWT,
        source_id: uuidv4(),
        user_id: userExists.id,
        tenant_id: userExists.tenant.id,
        ip_address: input.ip_address,
        user_agent: input.user_agent,
        refresh_token: token.refresh_token,
      });
    } else {
      await sessionRepo.update(sessionExist.id, {
        refresh_token: token.refresh_token,
        ip_address: input.ip_address,
        user_agent: input.user_agent,
      });
    }

    await usersRepo.updateLastLogin(userExists.id);

    const user = {
      ...userExists,
      ...token,
      role: userExists.role.name,
    };
    const avatar_url = await awsS3.getImage(user?.avatar_url);

    return plainToInstance(
      AuthOutputDto,
      { ...user, avatar_url },
      {
        excludeExtraneousValues: true,
      },
    );
  };
