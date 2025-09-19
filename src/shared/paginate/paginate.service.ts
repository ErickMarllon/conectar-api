import { Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'nestjs-typeorm-paginate';
import { SortOptionDto } from '../dto/sort-option.dto';
import { Order } from '../enums';
import { CursorPaginateDto, OffsetpaginateDto } from './dto';
import {
  IpaginateParams,
  IpaginateResult,
  IpaginateResultCursor,
  IpaginateResultOffset,
  IpaginateService,
} from './paginate-service.interface';
import { applySort } from './utils/apply-sort-util';
import { decodeCursor, encodeCursor } from './utils/cursor-utils';

@Injectable()
export class PaginateService<T extends ObjectLiteral = any>
  implements IpaginateService<T>
{
  protected applyDefaultSort(params: IpaginateParams<T>) {
    const defaultSort: SortOptionDto = {
      property: params.options.sortBy ?? 'created_at',
      order: params.options.order ?? Order.DESC,
    };

    const sortList = params.options.sort?.length
      ? params.options.sort
      : [defaultSort];

    if (!Object.keys(params.queryBuilder.expressionMap.orderBys).length) {
      applySort(params.queryBuilder, sortList, params.allowedFields);
    }
  }

  async offset(params: IpaginateParams<T>): Promise<IpaginateResultOffset<T>> {
    this.applyDefaultSort(params);

    const offset = Math.max(1, params.options.offset ?? 1);
    const limit = Math.max(1, params.options.limit ?? 10);

    params.queryBuilder.skip((offset - 1) * limit).take(limit);
    const [items, total] = await params.queryBuilder.getManyAndCount();

    return { items, meta: new OffsetpaginateDto(total, params.options) };
  }

  async cursor(params: IpaginateParams<T>): Promise<IpaginateResultCursor<T>> {
    this.applyDefaultSort(params);

    const limit = Math.max(1, params.options.limit ?? 10);
    const cursorValue = params.options.cursor
      ? decodeCursor(params.options.cursor)
      : null;

    const [sortField, sortOrderRaw] = Object.entries(
      params.queryBuilder.expressionMap.orderBys,
    )[0];

    if (!sortField) throw new Error('No orderBy found');

    const [alias, field] = sortField.split('.');
    const sortOrder = sortOrderRaw === Order.ASC ? Order.ASC : Order.DESC;

    if (cursorValue !== null) {
      params.queryBuilder.andWhere(
        `${alias}.${field} ${sortOrder === Order.ASC ? '>' : '<'} :cursor`,
        { cursor: cursorValue },
      );
    }

    params.queryBuilder.take(limit + 1);
    const items = await params.queryBuilder.getMany();
    if (items.length > limit) items.pop();

    const afterCursor = items.length
      ? encodeCursor(items[items.length - 1][field])
      : undefined;
    const beforeCursor =
      items.length && cursorValue ? encodeCursor(items[0][field]) : undefined;

    return {
      items,
      meta: new CursorPaginateDto(limit, afterCursor, beforeCursor),
    };
  }

  async list(params: IpaginateParams<T>): Promise<IpaginateResultOffset<T>> {
    this.applyDefaultSort(params);

    const limit = Math.max(1, params.options.limit ?? 100);
    params.queryBuilder.take(limit);

    const items = await params.queryBuilder.getMany();

    return {
      items,
      meta: new OffsetpaginateDto(items?.length, params.options),
    };
  }

  async paginate(params: IpaginateParams<T>): Promise<IpaginateResult<T>> {
    const mode = params.options.mode?.toUpperCase() ?? 'OFFSET';

    const strategies: Record<string, () => Promise<IpaginateResult<T>>> = {
      OFFSET: () => this.offset(params),
      CURSOR: () => this.cursor(params),
      LIST: () => this.list(params),
    };
    const strategyFn = strategies[mode];

    return strategyFn();
  }
}
