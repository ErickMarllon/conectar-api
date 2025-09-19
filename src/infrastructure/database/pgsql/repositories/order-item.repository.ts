import { IOrderItemRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlOrderItemM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlOrderItemRepository
  extends AbstractRepository<PgsqlOrderItemM>
  implements IOrderItemRepository
{
  constructor(
    @InjectRepository(PgsqlOrderItemM)
    repository: Repository<PgsqlOrderItemM>,
  ) {
    super(repository);
  }
}
