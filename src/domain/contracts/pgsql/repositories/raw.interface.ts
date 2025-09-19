import { Pagination } from 'nestjs-typeorm-paginate';
import { ObjectLiteral } from 'typeorm';

export interface IRawRepository {
  loadQuery: (input?: IRawRepositoryInput) => Promise<IRawRepositoryOutput>;
  containsDeletedAtColumn: (input: string) => Promise<boolean>;
}

export type IRawRepositoryInput = {
  columns?: string;
  tableName: string;
  conditions?: string[];
  orderBy?: string;
  limit?: number;
  page?: number;
  withImage?: boolean;
  mediableType?: string;
};

type ResponseObject = ObjectLiteral & { media?: string[] };

export type IRawRepositoryOutput =
  | Pagination<ResponseObject>
  | { items: ResponseObject[] };
