import { PgsqlTenantAddressM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type ITenantAddressRepository = AbstractRepoI<PgsqlTenantAddressM> & {};
