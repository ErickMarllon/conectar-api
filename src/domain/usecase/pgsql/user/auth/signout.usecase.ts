import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import {
  ISessionRepository,
  SignOutInput,
} from '@/domain/contracts/pgsql/repositories';
import { NotFoundException } from '@nestjs/common';

export type SignOutUseCase = (input: SignOutInput) => Promise<void>;

export type SignOutUseCaseFactory = (
  sessionRepo: ISessionRepository,
  jwtService: IJwtService,
) => SignOutUseCase;

export const createSignOutUseCase: SignOutUseCaseFactory =
  (sessionRepo) => async (sub) => {
    const session = await sessionRepo.findOneByPayload({ sub });

    if (!session) {
      throw new NotFoundException('Session not found for this user');
    }

    await sessionRepo.update(session.id, {
      access_token: undefined,
      refresh_token: undefined,
    });
  };
