import { INotificationEventRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlNotificationEventM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlNotificationEventRepository
  extends AbstractRepository<PgsqlNotificationEventM>
  implements INotificationEventRepository
{
  constructor(
    @InjectRepository(PgsqlNotificationEventM)
    repository: Repository<PgsqlNotificationEventM>,
  ) {
    super(repository);
  }
}
