import {
  FindAllPlanParams,
  IPlanRepository,
  PaginatedPlans,
} from '@/domain/contracts/pgsql/repositories/plan.repository.interface';
import { PaginateService } from '@/shared/paginate/paginate.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlPlanM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';
import { allowedFieldsForPlanClassification } from './constants/allowed-fields-for-plan-classification';

@Injectable()
export class PgsqlPlanRepository
  extends AbstractRepository<PgsqlPlanM>
  implements IPlanRepository
{
  constructor(
    @InjectRepository(PgsqlPlanM)
    repository: Repository<PgsqlPlanM>,
    private readonly paginateService: PaginateService,
  ) {
    super(repository);
  }
  async findAll(input: FindAllPlanParams): Promise<PaginatedPlans | undefined> {
    const { meta, filters, searchTerm } = input;

    const queryBuilder = this.repository
      .createQueryBuilder('plan')
      .leftJoin('plan.details', 'details')
      .leftJoin('plan.features', 'features')
      .select(['plan', 'details', 'features']);

    if (filters) {
      for (const rule of allowedFieldsForPlanClassification) {
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
      for (const f of allowedFieldsForPlanClassification) {
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
      allowedFields: allowedFieldsForPlanClassification,
    });
  }
}
