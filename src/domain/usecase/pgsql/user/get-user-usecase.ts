import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { IUserRepository } from '@/domain/contracts/pgsql/repositories';
import { LoadUserOutputDto } from '@/main/controllers/user/dto/load-user-output.dto';
import { plainToClass } from 'class-transformer';

export type GetUserUseCase = (input: {
  id: string;
  tenant: string;
}) => Promise<LoadUserOutputDto | null>;

type LoadUserUseCaseFactory = (
  userRepo: IUserRepository,
  awsS3: IAwsService,
) => GetUserUseCase;

export const createFindUserByIdUseCase: LoadUserUseCaseFactory =
  (usersRepo, awsS3) => async (input) => {
    const user = await usersRepo.findOneByWithRelation({
      where: { id: input.id, tenant: { name: input.tenant } },
      relations: ['role', 'tenant', 'sessions', 'addresses'],
    });
    let avatar_url: string | undefined = undefined;

    if (user?.avatar_url) {
      if (user.avatar_url.startsWith('https://')) {
        avatar_url = user.avatar_url;
      } else {
        avatar_url = await awsS3.getImage(user.avatar_url);
      }
    }
    return plainToClass(
      LoadUserOutputDto,
      {
        ...user,
        role: user?.role.name,
        avatar_url,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  };
