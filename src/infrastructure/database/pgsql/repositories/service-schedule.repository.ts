import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IServiceScheduleRepository } from '@/domain/contracts/pgsql/repositories';
import { PgsqlServiceScheduleM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlServiceScheduleRepository
  extends AbstractRepository<PgsqlServiceScheduleM>
  implements IServiceScheduleRepository
{
  constructor(
    @InjectRepository(PgsqlServiceScheduleM)
    repository: Repository<PgsqlServiceScheduleM>,
  ) {
    super(repository);
  }
}
