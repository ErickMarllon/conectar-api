import { ITenantSocialRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlTenantSocialM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlTenantSocialRepository
  extends AbstractRepository<PgsqlTenantSocialM>
  implements ITenantSocialRepository
{
  constructor(
    @InjectRepository(PgsqlTenantSocialM)
    repository: Repository<PgsqlTenantSocialM>,
  ) {
    super(repository);
  }
}
