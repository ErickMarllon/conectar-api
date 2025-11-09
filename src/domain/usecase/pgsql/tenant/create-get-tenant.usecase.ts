import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { ITenantRepository } from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { LoadTenantOutputDto } from '@/main/controllers/tenant/dto';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export type CreateGetTenantUseCase = (input: {
  id?: string;
  name?: string;
}) => Promise<LoadTenantOutputDto>;

export type CreateGetTenantUseCaseFactory = (
  tenantRepo: ITenantRepository,
  awsS3: IAwsService,
) => CreateGetTenantUseCase;

export const createGetTenantUseCase: CreateGetTenantUseCaseFactory =
  (tenantRepo, awsS3) => async (input) => {
    const tenant = await tenantRepo.findOneByWithRelation({
      where: { id: input.id },
      relations: ['addresses'],
    });

    if (!tenant) {
      throw new BadRequestException(`Tenant not found`);
    }

    tenant.cover_url = tenant.cover_url?.startsWith('https://')
      ? tenant.cover_url
      : await awsS3.getImage(tenant.cover_url);

    tenant.logo_url = tenant.logo_url?.startsWith('https://')
      ? tenant.logo_url
      : await awsS3.getImage(tenant.logo_url);

    return plainToInstance(LoadTenantOutputDto, tenant, {
      excludeExtraneousValues: true,
    });
  };
