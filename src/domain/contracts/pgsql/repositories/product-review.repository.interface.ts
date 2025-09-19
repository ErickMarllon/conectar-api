import { PgsqlProductReviewM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IProductReviewRepository = AbstractRepoI<PgsqlProductReviewM> & {};
