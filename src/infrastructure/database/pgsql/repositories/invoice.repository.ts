import { IInvoiceRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlInvoiceM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlInvoiceRepository
  extends AbstractRepository<PgsqlInvoiceM>
  implements IInvoiceRepository
{
  constructor(
    @InjectRepository(PgsqlInvoiceM)
    repository: Repository<PgsqlInvoiceM>,
  ) {
    super(repository);
  }
}
