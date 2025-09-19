import { ITenantNotificationSettingRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlTenantNotificationSettingM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlTenantNotificationSettingRepository
  extends AbstractRepository<PgsqlTenantNotificationSettingM>
  implements ITenantNotificationSettingRepository
{
  constructor(
    @InjectRepository(PgsqlTenantNotificationSettingM)
    repository: Repository<PgsqlTenantNotificationSettingM>,
  ) {
    super(repository);
  }
}
