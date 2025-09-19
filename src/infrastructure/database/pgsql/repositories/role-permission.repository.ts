import { IRolePermissionRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlRolePermissionM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlRolePermissionPermissionRepository
  extends AbstractRepository<PgsqlRolePermissionM>
  implements IRolePermissionRepository
{
  constructor(
    @InjectRepository(PgsqlRolePermissionM)
    repository: Repository<PgsqlRolePermissionM>,
  ) {
    super(repository);
  }
}
