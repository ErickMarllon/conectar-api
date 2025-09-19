import { IMediaRepository } from '@/domain/contracts/pgsql/repositories';
import { PgsqlMediaM } from '@/infrastructure/database/pgsql';

type Input = {
  media_id: string;
  is_main: boolean;
};
type Output = PgsqlMediaM;

type Setup = (mediaRepo: IMediaRepository) => MediaUpdate;

export type MediaUpdate = (input: Input) => Promise<Output>;
export const setupMediaUpdate: Setup = (mediaRepo) => async (input) => {
  const { media_id, is_main } = input;
  return mediaRepo.update(media_id, { is_main });
};
