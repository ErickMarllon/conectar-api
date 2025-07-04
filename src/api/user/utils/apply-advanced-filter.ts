import { User } from '@/infrastructure/database/entities/user-typeorm.entity';
import { SelectQueryBuilder } from 'typeorm';
import { UserFilterDto } from '../dto/user-filter.dto';

interface AdvancedUserFilter {
  queryBuilder: SelectQueryBuilder<User>;
  alias: string;
  filters?: Partial<UserFilterDto>;
}

export function applyAdvancedFilter({
  queryBuilder,
  alias,
  filters,
}: AdvancedUserFilter) {
  if (filters?.first_name) {
    queryBuilder.andWhere(`${alias}.first_name ILIKE :first_name`, {
      first_name: `%${filters.first_name}%`,
    });
  }

  if (filters?.last_name) {
    queryBuilder.andWhere(`${alias}.last_name ILIKE :last_name`, {
      last_name: `%${filters.last_name}%`,
    });
  }

  if (filters?.email) {
    queryBuilder.andWhere(`${alias}.email ILIKE :email`, {
      email: `%${filters.email}%`,
    });
  }

  if (filters?.role) {
    queryBuilder.andWhere(`${alias}.role = :role`, { role: filters.role });
  }

  if (filters?.startDate) {
    queryBuilder.andWhere(`${alias}.created_at >= :startDate`, {
      startDate: filters.startDate,
    });
  }

  if (filters?.endDate) {
    queryBuilder.andWhere(`${alias}.created_at <= :endDate`, {
      endDate: filters.endDate,
    });
  }

  return queryBuilder;
}
