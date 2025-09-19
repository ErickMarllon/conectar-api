import { ICategoryRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlCategoryM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlCategoryRepository
  extends AbstractRepository<PgsqlCategoryM>
  implements ICategoryRepository
{
  constructor(
    @InjectRepository(PgsqlCategoryM)
    repository: Repository<PgsqlCategoryM>,
  ) {
    super(repository);
  }
}
