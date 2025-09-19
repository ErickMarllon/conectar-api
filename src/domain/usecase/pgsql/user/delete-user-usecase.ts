import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { IUserRepository } from '@/domain/contracts/pgsql/repositories';

export type DeleteUserUseCase = (input: string | string[]) => Promise<void>;

export type DeleteUserUseCaseFactory = (
  userRepo: IUserRepository,
  awsS3: IAwsService,
) => DeleteUserUseCase;

export const createDeleteUserUseCase: DeleteUserUseCaseFactory =
  (usersRepo, awsS3) => async (id) => {
    const idsArray = Array.isArray(id) ? id : [id];
    const users = await usersRepo.findManyByIds(idsArray);

    if (!users) {
      throw new Error('User(s) not found');
    }
    for (const user of users ?? []) {
      const { avatar_url } = user ?? {};

      if (avatar_url && avatar_url.startsWith('avatar/')) {
        await awsS3.delete(avatar_url);
      }
    }
    return await usersRepo.deleteMany(idsArray);
  };
