import {
  FindAllTenantsParams,
  ITenantRepository,
  Paginatedtenants,
} from '@/domain/contracts/pgsql/repositories/tenant.repository.interface';
import { PaginateService } from '@/shared/paginate/paginate.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlTenantM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';
import { aliasTenantMap } from './constants/alias-tenant-map';
import { allowedFieldsForTenantClassification } from './constants/allowed-fields-for-tenant-classification';

@Injectable()
export class PgsqlTenantRepository
  extends AbstractRepository<PgsqlTenantM>
  implements ITenantRepository
{
  constructor(
    @InjectRepository(PgsqlTenantM)
    repository: Repository<PgsqlTenantM>,
    private readonly paginateService: PaginateService,
  ) {
    super(repository);
  }

  async findAll(
    input: FindAllTenantsParams,
  ): Promise<Paginatedtenants | undefined> {
    const { meta, filters, searchTerm } = input;

    const queryBuilder = this.repository
      .createQueryBuilder('tenant')
      .leftJoin('tenant.addresses', 'address')
      .leftJoin('tenant.social', 'social')
      .select(['tenant', 'address', 'social']);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (!value) return;
        const alias = aliasTenantMap[key] || 'tenant';
        const column = key;

        if (typeof value === 'boolean') {
          queryBuilder.andWhere(`${alias}.${column} = :${key}`, {
            [key]: value,
          });
        } else {
          queryBuilder.andWhere(`${alias}.${column} ILIKE :${key}`, {
            [key]: `%${value}%`,
          });
        }
      });
    }

    const searchConditions = [
      `tenant.name ILIKE :search`,
      `tenant.slug ILIKE :search`,
      `tenant.email ILIKE :search`,
      `tenant.phone_number ILIKE :search`,
      `tenant.whatsapp ILIKE :search`,
      `tenant.is_public ILIKE :search`,

      `address.zip_code ILIKE :search`,
      `address.street ILIKE :search`,
      `address.city ILIKE :search`,
      `address.state ILIKE :search`,
      `address.country ILIKE :search`,
    ];
    if (searchTerm?.trim()) {
      queryBuilder.andWhere(`${searchConditions.join(' OR ')}`, {
        search: `%${searchTerm}%`,
      });
    }

    return await this.paginateService.paginate({
      queryBuilder,
      options: meta,
      allowedFields: allowedFieldsForTenantClassification,
    });
  }
}
