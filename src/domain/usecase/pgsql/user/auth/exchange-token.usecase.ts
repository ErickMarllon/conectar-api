import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { ICacheService } from '@/domain/contracts/gateways/cache.gateway';
import {
  ISessionRepository,
  IUserOAuthRepository,
} from '@/domain/contracts/pgsql/repositories';
import { AuthOutputDto } from '@/main/controllers/auth/dto';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export type ExchangeCodeOauthUseCase = (
  input: string,
) => Promise<AuthOutputDto>;

export type ExchangeCodeOauthUseCaseFactory = (
  usersRepo: IUserOAuthRepository,
  sessionRepo: ISessionRepository,
  jwtService: IJwtService,
  cacheService: ICacheService,
) => ExchangeCodeOauthUseCase;

export const exchangeCodeForSessionUseCase: ExchangeCodeOauthUseCaseFactory =
  (usersRepo, sessionRepo, jwtService, cacheService) => async (input) => {
    const access_token = await cacheService.get<string>(input);

    if (!access_token) {
      throw new NotFoundException('Invalid code');
    }

    const { sub } = await jwtService.checkToken({ access_token });

    const sessionExist = await sessionRepo.findOneByPayload({ sub });

    if (!sessionExist) {
      throw new NotFoundException('User not found');
    }

    await usersRepo.updateLastLogin(sessionExist.user.id);

    await cacheService.del(input);

    return plainToInstance(
      AuthOutputDto,
      {
        ...sessionExist.user,
        access_token: sessionExist.access_token,
        refresh_token: sessionExist.refresh_token,
        role: sub.role,
      },
      { excludeExtraneousValues: true },
    );
  };
