import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PgsqlSession } from '@/domain/contracts/pgsql/entities';
import {
  ISessionRepository,
  SessionPayloadInput,
} from '@/domain/contracts/pgsql/repositories';
import { PgsqlSessionM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlSessionRepository
  extends AbstractRepository<PgsqlSessionM>
  implements ISessionRepository
{
  constructor(
    @InjectRepository(PgsqlSessionM)
    repository: Repository<PgsqlSessionM>,
  ) {
    super(repository);
  }
  async findByUserId(id: string): Promise<PgsqlSession | null> {
    return await this.repository.findOneBy({ user: { id } });
  }

  async findOneByPayload({
    sub,
  }: SessionPayloadInput): Promise<PgsqlSession | null> {
    const qb = this.repository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.tenant', 'tenant');

    if (sub.source) {
      qb.andWhere('session.source = :source', { source: sub.source });
    }

    if (sub.user_id) {
      qb.andWhere('session.user_id = :userId', { userId: sub.user_id });
    }

    if (sub.tenant) {
      qb.andWhere('tenant.name = :tenantName', { tenantName: sub.tenant });
    }

    return qb.getOne();
  }
}
