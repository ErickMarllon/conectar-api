import { ITenantSubscriptionRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlTenantSubscriptionM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlTenantSubscriptionRepository
  extends AbstractRepository<PgsqlTenantSubscriptionM>
  implements ITenantSubscriptionRepository
{
  constructor(
    @InjectRepository(PgsqlTenantSubscriptionM)
    repository: Repository<PgsqlTenantSubscriptionM>,
  ) {
    super(repository);
  }
}
