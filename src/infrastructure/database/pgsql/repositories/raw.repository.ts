import {
  IRawRepository,
  IRawRepositoryInput,
  IRawRepositoryOutput,
} from '@/domain/contracts/pgsql/repositories/raw.interface';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { paginateRaw } from 'nestjs-typeorm-paginate';
import { EntityManager } from 'typeorm';

@Injectable()
export class RawRepository implements IRawRepository {
  constructor(
    @InjectEntityManager()
    private readonly manager: EntityManager,
  ) {}

  async loadQuery({
    columns = 'id',
    tableName,
    conditions,
    limit,
    page = 1,
    orderBy,
    withImage = false,
    mediableType,
  }: IRawRepositoryInput): Promise<IRawRepositoryOutput> {
    let result: IRawRepositoryOutput;
    const tableColumns = columns
      .split(',')
      .map((column) => `${tableName}.${column.trim()} as ${column.trim()}`);

    const qb = this.manager
      .createQueryBuilder()
      .select(tableColumns)
      .from(tableName, tableName)
      .groupBy(columns);

    if (withImage) {
      qb.leftJoin(
        'media',
        'media',
        `media.mediable_id = ${tableName}.id AND media.mediable_type = :mediableType`,
        {
          mediableType,
        },
      ).addSelect('GROUP_CONCAT(media.path)', 'media_paths');
    }

    // if (conditions.length) {
    //   conditions.forEach((condition) => {
    //     qb.where(condition);
    //   });
    // }

    if (orderBy) {
      const columnOrders = orderBy.split(',').filter((column) => column != '');
      type order_type = 'ASC' | 'DESC';
      let upperCaseOrder: order_type;

      columnOrders.forEach((column) => {
        const [field, order] = column.split('+');

        upperCaseOrder = (order?.toUpperCase() as order_type) ?? 'ASC';

        qb.addOrderBy(field, upperCaseOrder);
      });
    }

    if (limit) {
      result = await paginateRaw(qb, { limit, page });
    } else {
      result = { items: await qb.getRawMany() };
    }

    if (withImage) {
      result = {
        ...result,
        items: result.items.map((item) => {
          const media = item.media_paths ? item.media_paths.split(',') : [];
          delete item.media_paths;
          return {
            ...item,
            media,
          };
        }),
      };
    }

    return result;
  }

  async containsDeletedAtColumn(table_name: any) {
    try {
      await this.manager.query(`SELECT deleted_at FROM ${table_name} LIMIT 1`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
