import { ITenantRepository } from '@/domain/contracts/pgsql/repositories';
import { SocialOutputDto } from '@/shared/dto/social-input.dto';
import { BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

export type GetTenantSocialUseCase = (input: {
  id?: string;
}) => Promise<SocialOutputDto | null>;

type GetTenantSocialUseCaseFactory = (
  tenantRepo: ITenantRepository,
) => GetTenantSocialUseCase;

export const createGetTenantSocialUseCase: GetTenantSocialUseCaseFactory =
  (tenantRepo) =>
  async ({ id }) => {
    const tenant = await tenantRepo.findOneByWithRelation({
      where: { id },
      relations: ['social'],
    });

    if (!tenant) {
      throw new BadRequestException('tenant not found');
    }

    return plainToClass(SocialOutputDto, tenant?.social, {
      excludeExtraneousValues: true,
    });
  };
