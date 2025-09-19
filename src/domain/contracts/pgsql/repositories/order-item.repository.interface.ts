import { PgsqlOrderItemM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IOrderItemRepository = AbstractRepoI<PgsqlOrderItemM> & {};
