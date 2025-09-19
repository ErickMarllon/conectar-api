import { SortOptionDto } from '@/shared/dto/sort-option.dto';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { SortField } from '../types';

export function applySort<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  sortList: SortOptionDto[] = [],
  allowedFields: SortField[] = [],
) {
  for (const item of sortList) {
    const match = allowedFields.find(
      (f) => f.field === item.property || f.alias === item.property,
    );

    if (!match) continue;

    const column =
      typeof match.isUuid === 'string'
        ? `CAST(${match.alias}.${match.field} AS TEXT)`
        : `${match.alias}.${match.field}`;

    queryBuilder.addOrderBy(column, item.order);
  }
}
