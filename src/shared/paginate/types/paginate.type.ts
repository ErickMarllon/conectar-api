import { SortOptionDto } from '@/shared/dto/sort-option.dto';
import { Order, PaginateMode } from '@/shared/enums';
import { CursorPaginateDto, OffsetpaginateDto } from '../dto';

export type PaginateOptions = {
  mode: PaginateMode;
  offset?: number;
  limit?: number;
  order?: Order;
  sortBy?: string;
  sort?: SortOptionDto[];
  cursor?: string;
};

export type PaginateResponse<T> =
  | { items?: T[]; meta?: OffsetpaginateDto | CursorPaginateDto }
  | undefined;
