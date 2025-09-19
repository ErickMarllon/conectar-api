import { PgsqlRolePermissionM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IRolePermissionRepository =
  AbstractRepoI<PgsqlRolePermissionM> & {};
