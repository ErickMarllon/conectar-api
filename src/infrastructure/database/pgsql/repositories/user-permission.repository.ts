import { IUserPermissionRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlUserPermissionM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlUserPermissionRepository
  extends AbstractRepository<PgsqlUserPermissionM>
  implements IUserPermissionRepository
{
  constructor(
    @InjectRepository(PgsqlUserPermissionM)
    readonly repository: Repository<PgsqlUserPermissionM>,
  ) {
    super(repository);
  }
}
