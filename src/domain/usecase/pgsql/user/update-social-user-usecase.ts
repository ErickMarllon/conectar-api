import {
  IUserRepository,
  IUserSocialRepository,
} from '@/domain/contracts/pgsql/repositories';
import { UpdateSocialUserInputDto } from '@/main/controllers/user/dto';
import { BadRequestException } from '@nestjs/common';

export type UpdateSocialUserUseCase = (input: {
  user_id: string;
  data: UpdateSocialUserInputDto;
  tenant: string;
}) => Promise<void>;

export type UpdateSocialUserUseCaseFactory = (
  usersRepo: IUserRepository,
  socialRepo: IUserSocialRepository,
) => UpdateSocialUserUseCase;

export const createUpdateSocialUserUseCase: UpdateSocialUserUseCaseFactory =
  (usersRepo, socialRepo) =>
  async ({ user_id, data, tenant }) => {
    const user = await usersRepo.findOneByWithRelation({
      where: { id: user_id, tenant: { name: tenant } },
      relations: ['role', 'tenant', 'social'],
    });

    if (!user) {
      throw new BadRequestException('user not found');
    }
    if (user?.social?.id) await socialRepo.update(user.social.id, data);
    if (!user?.social?.id)
      await socialRepo.create({ user: { id: user.id }, ...data });
  };
