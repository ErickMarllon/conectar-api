import { PgsqlServiceScheduleM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IServiceScheduleRepository = AbstractRepoI<PgsqlServiceScheduleM>;
