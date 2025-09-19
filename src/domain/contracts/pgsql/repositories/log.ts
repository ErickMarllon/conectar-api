import { PgsqlLogM } from '../entities';

export interface IPgsqlLogRepository {
  insert: (input: PgsqlInsertLogInput) => Promise<PgsqlInsertLogOutput>;
}

export type PgsqlInsertLogInput = PgsqlLogM;
export type PgsqlInsertLogOutput = unknown;
