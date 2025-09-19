import { PgsqlPermissionM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IPermissionRepository = AbstractRepoI<PgsqlPermissionM> & {};
