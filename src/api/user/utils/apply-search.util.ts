import { UserRole } from '@/shared/enums/app.enum';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export function applySearch<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  alias: string,
  searchTerm: string,
  searchableFields: string[],
): SelectQueryBuilder<T> {
  const formattedSearch = `%${searchTerm}%`;
  const normalizedRole = Object.values(UserRole).find(
    (role) => role.toUpperCase() === searchTerm.toUpperCase(),
  );

  searchableFields.forEach((field, index) => {
    const condition = `${alias}.${field} ILIKE :search`;
    if (index === 0) {
      queryBuilder.where(condition, { search: formattedSearch });
    } else {
      queryBuilder.orWhere(condition, { search: formattedSearch });
    }
  });

  if (normalizedRole) {
    queryBuilder.orWhere(`${alias}.role = :role`, { role: normalizedRole });
  }

  return queryBuilder;
}
