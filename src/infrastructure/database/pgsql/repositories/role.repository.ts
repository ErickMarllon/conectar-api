import { IRoleRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlRoleM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlRoleRepository
  extends AbstractRepository<PgsqlRoleM>
  implements IRoleRepository
{
  constructor(
    @InjectRepository(PgsqlRoleM)
    repository: Repository<PgsqlRoleM>,
  ) {
    super(repository);
  }
}
