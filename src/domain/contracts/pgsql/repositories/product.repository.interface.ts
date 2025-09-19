import { PgsqlProductM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IProductRepository = AbstractRepoI<PgsqlProductM> & {};
