import { PgsqlGatewaySettingM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IGatewaySettingRepository =
  AbstractRepoI<PgsqlGatewaySettingM> & {};
