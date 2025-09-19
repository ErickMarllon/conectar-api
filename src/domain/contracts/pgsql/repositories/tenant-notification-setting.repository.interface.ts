import { PgsqlTenantNotificationSettingM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type ITenantNotificationSettingRepository =
  AbstractRepoI<PgsqlTenantNotificationSettingM> & {};
