import { IOrderRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlOrderM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlOrderRepository
  extends AbstractRepository<PgsqlOrderM>
  implements IOrderRepository
{
  constructor(
    @InjectRepository(PgsqlOrderM)
    repository: Repository<PgsqlOrderM>,
  ) {
    super(repository);
  }
}
