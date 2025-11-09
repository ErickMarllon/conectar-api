import { IUserRepository } from '@/domain/contracts/pgsql/repositories';
import { UserStatus } from '@/shared/enums';

export type ToggleUserStatusUseCase = (id: string) => Promise<void>;

type ToggleUserStatusUseCaseFactory = (
  usersRepo: IUserRepository,
) => ToggleUserStatusUseCase;

export const createToggleUserStatusUseCase: ToggleUserStatusUseCaseFactory =
  (usersRepo) => async (id) => {
    const userExists = await usersRepo.findOneBy({ id });

    if (!userExists) {
      throw new Error('user not found');
    }

    const status =
      userExists.status === UserStatus.ACTIVE
        ? UserStatus.BANNED
        : UserStatus.ACTIVE;

    await usersRepo.update(id, { status });
  };
