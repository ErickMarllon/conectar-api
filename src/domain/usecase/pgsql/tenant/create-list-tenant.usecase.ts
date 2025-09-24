import { IAwsService } from '@/domain/contracts/gateways/awss3';
import {
  FindAllTenantsParams,
  ITenantRepository,
} from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { LoadTenantOutputDto } from '@/main/controllers/tenant/dto';
import { PaginateResponse } from '@/shared/paginate/types';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export type CreateListTenantUseCase = (
  input: FindAllTenantsParams,
) => Promise<PaginateResponse<LoadTenantOutputDto>>;

export type CreateListTenantUseCaseFactory = (
  tenantRepo: ITenantRepository,
  awsS3: IAwsService,
) => CreateListTenantUseCase;

export const createListTenantUseCase: CreateListTenantUseCaseFactory =
  (tenantRepo, awsS3) => async (input) => {
    const paginated = await tenantRepo.findAll(input);

    if (!paginated) {
      throw new BadRequestException(`Tenant not found`);
    }
    const transformed: any[] = [];

    for (const tenant of paginated?.items ?? []) {
      tenant.cover_url = tenant.cover_url?.startsWith('https://')
        ? tenant.cover_url
        : await awsS3.getImage(tenant.cover_url);

      tenant.logo_url = tenant.logo_url?.startsWith('https://')
        ? tenant.logo_url
        : await awsS3.getImage(tenant.logo_url);

      transformed.push({ ...tenant, social_links: tenant.social });
    }

    const items = plainToInstance(LoadTenantOutputDto, transformed ?? [], {
      excludeExtraneousValues: true,
    });

    return {
      items,
      meta: paginated?.meta,
    };
  };
