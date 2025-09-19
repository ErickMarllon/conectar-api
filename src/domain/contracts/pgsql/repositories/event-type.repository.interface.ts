import { PgsqlEventTypeM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IEventTypeRepository = AbstractRepoI<PgsqlEventTypeM> & {};
