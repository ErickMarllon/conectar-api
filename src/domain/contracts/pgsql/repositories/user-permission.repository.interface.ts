import { PgsqlUserPermissionM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IUserPermissionRepository =
  AbstractRepoI<PgsqlUserPermissionM> & {};
