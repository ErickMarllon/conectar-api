import { IPaymentRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlPaymentM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlPaymentRepository
  extends AbstractRepository<PgsqlPaymentM>
  implements IPaymentRepository
{
  constructor(
    @InjectRepository(PgsqlPaymentM)
    repository: Repository<PgsqlPaymentM>,
  ) {
    super(repository);
  }
}
