import { IProductRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlProductM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlProductRepository
  extends AbstractRepository<PgsqlProductM>
  implements IProductRepository
{
  constructor(
    @InjectRepository(PgsqlProductM)
    repository: Repository<PgsqlProductM>,
  ) {
    super(repository);
  }
}
