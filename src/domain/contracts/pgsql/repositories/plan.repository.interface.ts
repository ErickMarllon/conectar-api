import { PgsqlPlanM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IPlanRepository = AbstractRepoI<PgsqlPlanM> & {};
