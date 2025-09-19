import { IUserSocialRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlUserSocialM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlUserSocialRepository
  extends AbstractRepository<PgsqlUserSocialM>
  implements IUserSocialRepository
{
  constructor(
    @InjectRepository(PgsqlUserSocialM)
    readonly repository: Repository<PgsqlUserSocialM>,
  ) {
    super(repository);
  }
}
