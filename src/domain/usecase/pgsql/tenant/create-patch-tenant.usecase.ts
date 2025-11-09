import { IAwsService } from '@/domain/contracts/gateways/awss3';
import {
  ITenantRepository,
  PatchTenantInput,
} from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { BadRequestException } from '@nestjs/common';

export type CreatePatchTenantUseCase = (input: {
  id?: string;
  data: Partial<PatchTenantInput>;
  logo?: Express.Multer.File;
  cover?: Express.Multer.File;
}) => Promise<void>;

export type CreatePatchTenantUseCaseFactory = (
  tenantRepo: ITenantRepository,
  awsS3: IAwsService,
) => CreatePatchTenantUseCase;

export const createPatchTenantUseCase: CreatePatchTenantUseCaseFactory =
  (tenantRepo, awsS3) => async (input) => {
    const tenant = await tenantRepo.findOneBy({ id: input.id });

    if (!tenant) {
      throw new BadRequestException(`Tenant not found`);
    }
    let logo_url: string | undefined;
    let cover_url: string | undefined;

    if (input.logo) {
      logo_url = `enterprise/${input.id}.${input.logo.originalname.split('.').pop()}`;

      await awsS3.upload({
        key: logo_url,
        buffer: input.logo.buffer,
        contentType: input.logo.mimetype,
      });
    }
    if (input.cover) {
      cover_url = `enterprise/${input.id}.${input.cover.originalname.split('.').pop()}`;

      await awsS3.upload({
        key: cover_url,
        buffer: input.cover.buffer,
        contentType: input.cover.mimetype,
      });
    }

    await tenantRepo.update(tenant.id, {
      ...input.data,
      cover_url,
      logo_url,
    });
  };
