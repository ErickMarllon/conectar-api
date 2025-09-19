import { IPermissionRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlPermissionM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlPermissionRepository
  extends AbstractRepository<PgsqlPermissionM>
  implements IPermissionRepository
{
  constructor(
    @InjectRepository(PgsqlPermissionM)
    repository: Repository<PgsqlPermissionM>,
  ) {
    super(repository);
  }
}
