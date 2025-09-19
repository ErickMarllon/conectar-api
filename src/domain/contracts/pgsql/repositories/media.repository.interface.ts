import { PgsqlMediaM } from '@/infrastructure/database/pgsql';
import { PgsqlMedia } from '../entities';
import { AbstractRepoI } from './base-entity.interface';

export type GetMediaInput = { id: string };
export type GetMediaOutput = PgsqlMedia;

export type MainMediaInput = { item_ids: string[] };
export type MainMediaOutput = Partial<PgsqlMedia & { row_num: number }>[];

export type GetItemsMainMediaOutput = Partial<
  PgsqlMedia & { row_num: number }
>[];

export type GetAllMediaInput = {
  item_id: string;
};
export type GetAllMediaOutput = PgsqlMedia[];

export type SaveMediaInput = Partial<PgsqlMedia>;
export type SaveMediaOutput = PgsqlMedia;

export type IMediaRepository = AbstractRepoI<PgsqlMediaM> & {
  getAll: (input: GetAllMediaInput) => Promise<GetAllMediaOutput>;
  getItemsMainMediaForProducts: (
    item_ids: string[],
  ) => Promise<MainMediaOutput>;
  getItemsMainMediaForServices: (
    item_ids: string[],
  ) => Promise<MainMediaOutput>;
};
