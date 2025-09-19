import { IEventTypeRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlEventTypeM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlEventTypeMRepository
  extends AbstractRepository<PgsqlEventTypeM>
  implements IEventTypeRepository
{
  constructor(
    @InjectRepository(PgsqlEventTypeM)
    repository: Repository<PgsqlEventTypeM>,
  ) {
    super(repository);
  }
}
