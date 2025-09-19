import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IServiceRepository } from '@/domain/contracts/pgsql/repositories';
import { PgsqlServiceM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlServiceRepository
  extends AbstractRepository<PgsqlServiceM>
  implements IServiceRepository
{
  constructor(
    @InjectRepository(PgsqlServiceM)
    repository: Repository<PgsqlServiceM>,
  ) {
    super(repository);
  }
}
