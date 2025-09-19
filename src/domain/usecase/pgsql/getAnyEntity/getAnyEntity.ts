import {
  IRawRepository,
  IRawRepositoryOutput,
} from '@/domain/contracts/pgsql/repositories/raw.interface';
import { PaginateOptions } from '@/shared/paginate/types';

type Setup = (rawRepo: IRawRepository) => GetAnyEntity;

type Input = {
  tableName: string;
  query: { [key: string]: string };
  meta: PaginateOptions;
};

export type GetAnyEntity = (input: Input) => Promise<IRawRepositoryOutput>;

export const getAnyEntity: Setup =
  (rawRepo) =>
  async ({ query, tableName, meta }) => {
    try {
      const conditions: string[] = [];
      const columns = query['columns'];
      const orderBy = query['order_by'];
      const limit = meta.limit;
      const page = meta.offset;
      // const withImage = query['with_image'] === 'true';
      // const mediableType = withImage && MediableTypeEnum?.[tableName];

      const queryKeys = Object.keys(query);

      if (queryKeys.length) {
        queryKeys.forEach((key) => {
          if (
            !['limit', 'page', 'columns', 'order_by', 'with_image'].includes(
              key,
            )
          ) {
            const value = query[key];

            if (value.includes('%')) {
              conditions.push(`${tableName}.${key} LIKE '${value}'`);
            } else {
              conditions.push(`${tableName}.${key} = ${value}`);
            }
          }
        });
      }

      const result = await rawRepo.loadQuery({
        tableName,
        columns,
        conditions,
        orderBy,
        limit,
        page,
        // withImage,
        // mediableType,
      });

      // if (withImage) {
      //   result = {
      //     ...result,
      //     items: await Promise.all(
      //       result.items.map(async ({ media, ...rest }) => ({
      //         ...rest,
      //         media: await Promise.all(
      //           media.map(async (path) => await awsS3Service.getImageUrl(path)),
      //         ),
      //       })),
      //     ),
      //   };
      // }

      return result;
    } catch (error) {
      if (error.message.includes('Unknown column')) {
        const column = error.message.match(/Unknown column '([^']+)'/)[1];
        throw new Error(
          `A coluna '${column}' não existe, tente novamente com outra coluna!`,
        );
      }
      throw error;
    }
  };
