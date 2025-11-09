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
      for (const rule of allowedFieldsForTenantClassification) {
        const { alias, field, operator, isUuid } = rule;

        if (filters[field]) {
          const param = `${alias}_${field}`;

          if (operator === 'eq') {
            queryBuilder.andWhere(
              `${alias}.${field}${isUuid ? '::text ILIKE ' : ' = '}:${param}`,
              {
                [param]: isUuid ? `%${filters[field]}%` : filters[field],
              },
            );
          }

          if (operator === 'ilike') {
            queryBuilder.andWhere(`${alias}.${field} ILIKE :${param}`, {
              [param]: `%${filters[field]}%`,
            });
          }
        }
      }
    }

    if (searchTerm?.trim()) {
      for (const f of allowedFieldsForTenantClassification) {
        if (f.operator === 'ilike') {
          queryBuilder.orWhere(`${f.alias}.${f.field} ILIKE :search`, {
            search: `%${searchTerm}%`,
          });
        }
      }
    }

    return await this.paginateService.paginate({
      queryBuilder,
      options: meta,
      allowedFields: allowedFieldsForTenantClassification,
    });
  }
}
