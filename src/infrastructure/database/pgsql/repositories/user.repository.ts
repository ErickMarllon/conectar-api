import {
  FindAllUsersParams,
  IUserRepository,
  PaginatedUsers,
} from '@/domain/contracts/pgsql/repositories/user.repository.interface';
import { PaginateService } from '@/shared/paginate/paginate.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PgsqlUserM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';
import { allowedFieldsForUserClassification } from './constants/allowed-fields-for-user-classification';

@Injectable()
export class PgsqlUserRepository
  extends AbstractRepository<PgsqlUserM>
  implements IUserRepository
{
  constructor(
    @InjectRepository(PgsqlUserM)
    readonly repository: Repository<PgsqlUserM>,
    private readonly paginateService: PaginateService,
  ) {
    super(repository);
  }

  async findAll(
    input: FindAllUsersParams,
  ): Promise<PaginatedUsers | undefined> {
    const { meta, filters, searchTerm, currentUser } = input;

    const queryBuilder = this.repository
      .createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .leftJoin('user.addresses', 'address')
      .leftJoin('user.tenant', 'tenant')
      .leftJoin('user.social', 'social')
      .leftJoin('user.sessions', 'sessions')
      .select(['user', 'role.name', 'address', 'social', 'sessions']);

    if (currentUser?.user_id) {
      queryBuilder.andWhere('user.id != :currentUserId', {
        currentUserId: currentUser.user_id,
      });
    }

    if (filters) {
      for (const rule of allowedFieldsForUserClassification) {
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
      for (const f of allowedFieldsForUserClassification) {
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
      allowedFields: allowedFieldsForUserClassification,
    });
  }

  async findManyByIds(input: string[]): Promise<PgsqlUserM[]> {
    return await this.repository.find({
      where: { id: In(input) },
    });
  }

  async updateLastLogin(id: string): Promise<PgsqlUserM> {
    await this.repository.update(id, { last_login_at: new Date() });
    const updated = await this.repository.findOneBy({ id });
    if (!updated) throw new Error('Entity not found after update');
    return updated;
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.repository.delete({
      id: In(ids),
    });
  }
}
