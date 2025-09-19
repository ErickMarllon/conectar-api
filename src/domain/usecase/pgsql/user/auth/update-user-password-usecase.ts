import { CryptoGateway } from '@/domain/contracts/gateways/crypto.gateway';
import {
  ISessionRepository,
  IUserRepository,
} from '@/domain/contracts/pgsql/repositories';
import { AuthOutputDto } from '@/main/controllers/auth/dto';
import { CurrentUserDto } from '@/main/controllers/user/dto';
import { Role } from '@/shared/enums';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

export type UpdateUserPasswordUseCase = (input: {
  currentUser: CurrentUserDto;
  user_id: string;
  old_password?: string;
  new_password: string;
  delete_all_sessions: boolean;
}) => Promise<AuthOutputDto | undefined>;

export type UpdateUserPasswordUseCaseFactory = (
  usersRepo: IUserRepository,
  sessionRepo: ISessionRepository,
  crypto: CryptoGateway,
) => UpdateUserPasswordUseCase;

export const createUpdateUserPasswordUseCase: UpdateUserPasswordUseCaseFactory =
  (usersRepo, sessionRepo, crypto) => async (input) => {
    const userExists = await usersRepo.findOneByWithRelation({
      where: {
        id: input.user_id,
        tenant: { name: input.currentUser.tenant },
      },
      relations: ['tenant', 'role', 'sessions'],
    });

    if (!userExists) {
      throw new NotFoundException('user not found');
    }

    const isAdminOrManager = input.currentUser.role !== Role.USER;

    if (!isAdminOrManager && userExists.password && input.old_password) {
      const passwordMatches = await crypto.verify(
        userExists.password,
        input.old_password,
      );

      if (!passwordMatches) {
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    const passwordHashed = await crypto.hash(input.new_password);

    await usersRepo.update(input.user_id, {
      password: passwordHashed,
    });

    if (input.delete_all_sessions) {
      for (const session of userExists.sessions) {
        if (session.refresh_token !== input.currentUser.refresh_token) {
          await sessionRepo.delete(session.id);
        }
      }
    }
    const updatedUser = await usersRepo.findOneByWithRelation({
      where: { id: input.user_id },
      relations: ['tenant', 'role', 'sessions'],
    });

    return plainToInstance(
      AuthOutputDto,
      {
        ...updatedUser,
        role: updatedUser?.role.name,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  };
