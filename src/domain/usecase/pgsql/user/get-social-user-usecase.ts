import {
  IUserRepository,
  IUserSocialRepository,
} from '@/domain/contracts/pgsql/repositories';
import { UpdateSocialUserOutputDto } from '@/main/controllers/user/dto';
import { BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

export type GetSocialUserUseCase = (input: {
  id: string;
  tenant: string;
}) => Promise<UpdateSocialUserOutputDto | null>;

type LoadSocialUserUseCaseFactory = (
  userRepo: IUserRepository,
  socialRepo: IUserSocialRepository,
) => GetSocialUserUseCase;

export const createFindSocialUserByIdUseCase: LoadSocialUserUseCaseFactory =
  (usersRepo, socialRepo) => async (input) => {
    const user = await usersRepo.findOneByWithRelation({
      where: { id: input.id, tenant: { name: input.tenant } },
      relations: ['tenant', 'social'],
    });
    console.log('🚀 ~ createFindSocialUserByIdUseCase ~ user:', user);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    return plainToClass(UpdateSocialUserOutputDto, user?.social, {
      excludeExtraneousValues: true,
    });
  };
