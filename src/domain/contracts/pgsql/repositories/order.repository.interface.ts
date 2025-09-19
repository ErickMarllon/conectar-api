import { PgsqlOrderM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IOrderRepository = AbstractRepoI<PgsqlOrderM> & {};
