import {
  ITenantRepository,
  ITenantSocialRepository,
} from '@/domain/contracts/pgsql/repositories';
import { SocialInputDto } from '@/shared/dto/social-input.dto';
import { BadRequestException } from '@nestjs/common';

export type PatchTenantSocialUseCase = (input: {
  id: string;
  data: SocialInputDto;
}) => Promise<void>;

export type PatchTenantSocialUseCaseFactory = (
  tenantRepo: ITenantRepository,
  socialRepo: ITenantSocialRepository,
) => PatchTenantSocialUseCase;

export const createPatchTenantSocialUseCase: PatchTenantSocialUseCaseFactory =
  (tenantRepo, socialRepo) =>
  async ({ id, data }) => {
    const tenant = await tenantRepo.findOneByWithRelation({
      where: { id },
      relations: ['social'],
    });

    if (!tenant) {
      throw new BadRequestException('tenant not found');
    }

    if (tenant?.social?.id) await socialRepo.update(tenant.social.id, data);
    if (!tenant?.social?.id) await socialRepo.create({ ...data, id });
  };
