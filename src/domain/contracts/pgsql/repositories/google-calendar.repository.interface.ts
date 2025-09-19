import { PgsqlGoogleCalendarM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IGoogleCalendarRepository =
  AbstractRepoI<PgsqlGoogleCalendarM> & {};
