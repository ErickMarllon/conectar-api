import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { ICacheService } from '@/domain/contracts/gateways/cache.gateway';
import { ProcessOauthInput } from '@/domain/contracts/pgsql/repositories';
import { InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export type ProcessOauthUseCase = (input: ProcessOauthInput) => Promise<string>;

export type OauthProcessUseCaseFactory = (
  jwtService: IJwtService,
  cacheService: ICacheService,
) => ProcessOauthUseCase;

export const processOauthRedirectUseCase: OauthProcessUseCaseFactory =
  (jwtService, cacheService) => async (input) => {
    const { sub } = await jwtService.checkToken({
      access_token: input.user.access_token,
    });

    const token = await jwtService.generateTokens({ sub });

    const code = uuidv4();
    const redirectUrl = input?.redirectUrl;
    try {
      await cacheService.set(code, token.access_token, 60 * 60 * 24);
    } catch {
      throw new InternalServerErrorException(
        'Error storing temporary token in the cache',
      );
    }
    return `${redirectUrl}?code=${code}`;
  };
