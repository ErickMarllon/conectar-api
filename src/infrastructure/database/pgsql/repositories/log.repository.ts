import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  IPgsqlLogRepository,
  PgsqlInsertLogInput,
  PgsqlInsertLogOutput,
} from '@/domain/contracts/pgsql/repositories/log';
import { Repository } from 'typeorm';
import { PgsqlLog } from '../entities';

@Injectable()
export class PgsqlLogRepository implements IPgsqlLogRepository {
  constructor(
    @InjectRepository(PgsqlLog) private readonly logRepo: Repository<PgsqlLog>,
  ) {}

  async insert(input: PgsqlInsertLogInput): Promise<PgsqlInsertLogOutput> {
    return await this.logRepo.insert(input);
  }
}
