import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import {
  ISessionRepository,
  RefreshTokenInput,
} from '@/domain/contracts/pgsql/repositories';
import { AuthOutputDto } from '@/main/controllers/auth/dto';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export type RefreshTokenUseCase = (
  input: RefreshTokenInput,
) => Promise<AuthOutputDto>;

export type RefreshTokenUseCaseFactory = (
  sessionRepo: ISessionRepository,
  jwtService: IJwtService,
) => RefreshTokenUseCase;

export const createRefreshTokenUseCase: RefreshTokenUseCaseFactory =
  (sessionRepo, jwtService) =>
  async ({ refresh_token: refresh_token_from_header }) => {
    const { sub } = await jwtService.checkToken({
      refresh_token: refresh_token_from_header,
    });

    const session = await sessionRepo.findOneByPayload({ sub });

    if (!session) {
      throw new BadRequestException('User not found');
    }

    if (
      !session.refresh_token ||
      session.refresh_token !== refresh_token_from_header
    ) {
      throw new BadRequestException(`Invalid token`);
    }

    const token = await jwtService.generateTokens({ sub });

    await sessionRepo.update(session.id, {
      refresh_token: token.refresh_token,
    });

    return plainToInstance(
      AuthOutputDto,
      {
        ...session.user,
        ...token,
        role: sub.role,
      },
      { excludeExtraneousValues: true },
    );
  };
