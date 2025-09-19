import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { IUserRepository } from '@/domain/contracts/pgsql/repositories';
import { UserProfileDto } from '@/main/controllers/user/dto';
import { NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

export type GetUserProfileUseCase = (input: {
  id: string;
  tenant: string;
}) => Promise<UserProfileDto | null>;

type GetUserProfileUseCaseFactory = (
  userRepo: IUserRepository,
  awsS3: IAwsService,
) => GetUserProfileUseCase;

export const createUserProfiledUseCase: GetUserProfileUseCaseFactory =
  (usersRepo, awsS3) => async (input) => {
    const user = await usersRepo.findOneByWithRelation({
      where: { id: input.id, tenant: { name: input.tenant } },
      relations: ['role', 'tenant', 'tenant.social', 'sessions', 'addresses'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let avatar_url: string | undefined = undefined;

    if (user?.avatar_url) {
      if (user.avatar_url.startsWith('https://')) {
        avatar_url = user.avatar_url;
      } else {
        avatar_url = await awsS3.getImage(user.avatar_url);
      }
    }

    return plainToClass(
      UserProfileDto,
      {
        ...user,
        role: user?.role.name,
        avatar_url,
        social_links: user?.social,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  };
