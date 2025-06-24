import { User } from '@/database/entities/user-typeorm.entity';
import { SelectQueryBuilder } from 'typeorm';

export function applySearch<T>(
  queryBuilder: SelectQueryBuilder<User>,
  alias: string,
  searchTerm: string,
  searchableFields: (keyof T)[],
): void {
  const formattedSearch = `%${searchTerm}%`;

  searchableFields.forEach((field, index) => {
    const condition = `${alias}.${String(field)} LIKE :search`;
    if (index === 0) {
      queryBuilder.where(condition, { search: formattedSearch });
    } else {
      queryBuilder.orWhere(condition, { search: formattedSearch });
    }
  });
}
