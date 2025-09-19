import { IGoogleCalendarRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlGoogleCalendarM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlGoogleCalendarRepository
  extends AbstractRepository<PgsqlGoogleCalendarM>
  implements IGoogleCalendarRepository
{
  constructor(
    @InjectRepository(PgsqlGoogleCalendarM)
    repository: Repository<PgsqlGoogleCalendarM>,
  ) {
    super(repository);
  }
}
