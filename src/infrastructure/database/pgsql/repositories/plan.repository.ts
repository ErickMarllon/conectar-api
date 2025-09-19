import { IPlanRepository } from '@/domain/contracts/pgsql/repositories/plan.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlPlanM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlPlanRepository
  extends AbstractRepository<PgsqlPlanM>
  implements IPlanRepository
{
  constructor(
    @InjectRepository(PgsqlPlanM)
    repository: Repository<PgsqlPlanM>,
  ) {
    super(repository);
  }
}
