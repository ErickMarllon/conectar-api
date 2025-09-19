import { IProductReviewRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlProductReviewM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlProductReviewRepository
  extends AbstractRepository<PgsqlProductReviewM>
  implements IProductReviewRepository
{
  constructor(
    @InjectRepository(PgsqlProductReviewM)
    repository: Repository<PgsqlProductReviewM>,
  ) {
    super(repository);
  }
}
