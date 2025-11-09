import { PgsqlPlanM } from '@/infrastructure/database/pgsql';
import { PaginateOptions, PaginateResponse } from '@/shared/paginate/types';
import { PgsqlPlan } from '../entities';
import { AbstractRepoI } from './base-entity.interface';

export type CreatePlanInput = Partial<
  Omit<
    PgsqlPlan,
    'id' | 'created_at' | 'updated_at' | 'tenants' | 'subscriptions'
  >
>;

export type PatchPlanInput = Partial<
  Omit<PgsqlPlan, 'created_at' | 'updated_at' | 'tenants' | 'subscriptions'>
>;

export type FindPlanParams = Partial<PgsqlPlan> & {
  searchTerm?: string;
};
export type PaginatedPlans = PaginateResponse<PgsqlPlanM>;

export type FindAllPlanParams = {
  filters?: FindPlanParams;
  searchTerm?: string;
  meta: PaginateOptions;
};

export type IPlanRepository = AbstractRepoI<PgsqlPlanM> & {
  findAll(input: FindAllPlanParams): Promise<PaginatedPlans | undefined>;
};
