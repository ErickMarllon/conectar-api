import {
  GetAllMediaInput,
  GetAllMediaOutput,
  GetItemsMainMediaOutput,
  IMediaRepository,
} from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlMediaM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class MediaRepository
  extends AbstractRepository<PgsqlMediaM>
  implements IMediaRepository
{
  constructor(
    @InjectRepository(PgsqlMediaM)
    private readonly mediaRepo: Repository<PgsqlMediaM>,
  ) {
    super(mediaRepo);
  }

  getAll(input: GetAllMediaInput): Promise<GetAllMediaOutput> {
    return this.mediaRepo.find({
      where: {
        id: input.item_id,
      },
      order: { is_main: 'DESC', created_at: 'ASC' },
    });
  }

  async getItemsMainMediaForProducts(
    item_ids: string[],
  ): Promise<GetItemsMainMediaOutput> {
    if (item_ids.length === 0) return [];

    return this.mediaRepo
      .createQueryBuilder('media')
      .select([
        'media.id AS id',
        'media.path AS path',
        'media.product_id AS product_id',
        `ROW_NUMBER() OVER (PARTITION BY media.product_id ORDER BY media.is_main DESC, media.created_at ASC) AS row_num`,
      ])
      .where('media.product_id IN (:...item_ids)', { item_ids })
      .getRawMany();
  }

  async getItemsMainMediaForServices(
    item_ids: string[],
  ): Promise<GetItemsMainMediaOutput> {
    if (item_ids.length === 0) return [];

    return this.mediaRepo
      .createQueryBuilder('media')
      .select([
        'media.id AS id',
        'media.path AS path',
        'media.service_id AS service_id',
        `ROW_NUMBER() OVER (PARTITION BY media.service_id ORDER BY media.is_main DESC, media.created_at ASC) AS row_num`,
      ])
      .where('media.service_id IN (:...item_ids)', { item_ids })
      .getRawMany();
  }
}
