import { ObjectLiteral } from 'nestjs-typeorm-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { CursorPaginateDto, OffsetpaginateDto } from './dto';
import { PaginateOptions } from './types';
import { SortField } from './types/sort-field.type';

export type IpaginateParams<T extends ObjectLiteral> = {
  queryBuilder: SelectQueryBuilder<T>;
  options: PaginateOptions;
  allowedFields?: SortField[];
};

export type IpaginateResultOffset<T> = {
  items: T[];
  meta: OffsetpaginateDto;
};

export type IpaginateResultCursor<T> = {
  items: T[];
  meta: CursorPaginateDto;
};

export type IpaginateResult<T> = {
  items: T[];
  meta: OffsetpaginateDto | CursorPaginateDto;
};

export interface IpaginateService<T extends ObjectLiteral = any> {
  offset(params: IpaginateParams<T>): Promise<IpaginateResultOffset<T>>;

  cursor(params: IpaginateParams<T>): Promise<IpaginateResultCursor<T>>;

  list(params: IpaginateParams<T>): Promise<IpaginateResultOffset<T>>;

  paginate(params: IpaginateParams<T>): Promise<IpaginateResult<T>>;
}
