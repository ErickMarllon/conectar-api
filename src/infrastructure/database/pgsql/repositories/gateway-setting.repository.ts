import { IGatewaySettingRepository } from '@/domain/contracts/pgsql/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PgsqlGatewaySettingM } from '../entities';
import { AbstractRepository } from './abstract-repo.repository';

@Injectable()
export class PgsqlGatewaySettingRepository
  extends AbstractRepository<PgsqlGatewaySettingM>
  implements IGatewaySettingRepository
{
  constructor(
    @InjectRepository(PgsqlGatewaySettingM)
    repository: Repository<PgsqlGatewaySettingM>,
  ) {
    super(repository);
  }
}
