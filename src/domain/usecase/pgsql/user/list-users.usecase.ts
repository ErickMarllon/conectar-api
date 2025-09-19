import { IAwsService } from '@/domain/contracts/gateways/awss3';
import {
  FindAllUsersParams,
  IUserRepository,
} from '@/domain/contracts/pgsql/repositories';
import { LoadAllUserOutputDto } from '@/main/controllers/user/dto';
import { PaginateResponse } from '@/shared/paginate/types';
import { hasRecent } from '@/shared/utils/hasRecent';
import { plainToInstance } from 'class-transformer';

export type ListUsersUseCase = (
  input: FindAllUsersParams,
) => Promise<PaginateResponse<LoadAllUserOutputDto>>;

type ListUsersUseCaseFactory = (
  userRepo: IUserRepository,
  awsS3: IAwsService,
) => ListUsersUseCase;

export const createListUsersUseCase: ListUsersUseCaseFactory =
  (usersRepo, awsS3) => async (input) => {
    const paginated = await usersRepo.findAll(input);
    const transformed: any[] = [];

    for (const user of paginated?.items ?? []) {
      user.avatar_url = user.avatar_url?.startsWith('https://')
        ? user.avatar_url
        : await awsS3.getImage(user.avatar_url);

      const is_active = hasRecent(user?.sessions, 'updated_at', 30);
      transformed.push({ ...user, is_active, social_links: user.social });
    }

    const items = plainToInstance(LoadAllUserOutputDto, transformed ?? [], {
      excludeExtraneousValues: true,
    });

    return {
      items,
      meta: paginated?.meta,
    };
  };
