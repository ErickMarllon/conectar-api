import { PgsqlRoleM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IRoleRepository = AbstractRepoI<PgsqlRoleM>;
