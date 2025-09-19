import { IAddressRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlAddressM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlAddressRepository
  extends AbstractRepository<PgsqlAddressM>
  implements IAddressRepository
{
  constructor(
    @InjectRepository(PgsqlAddressM)
    repository: Repository<PgsqlAddressM>,
  ) {
    super(repository);
  }
}
