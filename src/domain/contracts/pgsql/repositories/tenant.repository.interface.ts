import { PaginateOptions, PaginateResponse } from '@/shared/paginate/types';
import { PgsqlTenant } from '../entities';
import { AbstractRepoI } from './base-entity.interface';

export type FindTenantsParams = Partial<PgsqlTenant> & {
  searchTerm?: string;
};

export type PatchTenantInput = {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  logo_url: string;
  cover_url: string;
  phone_number: string;
  status: string;
  slug: string;
  about: string;
  enable_service_schedule: boolean;
  enable_google_calendar: boolean;
  is_public: boolean;
};

export type CreateTenantInput = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  tenant_name: string;
  plan?: string;
};

export type FindAllTenantsParams = {
  filters?: FindTenantsParams;
  searchTerm?: string;
  meta: PaginateOptions;
};
export type Paginatedtenants = PaginateResponse<PgsqlTenant>;

export type ITenantRepository = AbstractRepoI<PgsqlTenant> & {
  findAll(input: FindAllTenantsParams): Promise<Paginatedtenants | undefined>;
};
