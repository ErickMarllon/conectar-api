import { ITenantAddressRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlTenantAddressM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlTenantAddressRepository
  extends AbstractRepository<PgsqlTenantAddressM>
  implements ITenantAddressRepository
{
  constructor(
    @InjectRepository(PgsqlTenantAddressM)
    repository: Repository<PgsqlTenantAddressM>,
  ) {
    super(repository);
  }
}
