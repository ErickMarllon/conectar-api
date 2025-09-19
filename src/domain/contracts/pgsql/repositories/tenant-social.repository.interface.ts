import { PgsqlTenantSocialM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type ITenantSocialRepository = AbstractRepoI<PgsqlTenantSocialM> & {};
