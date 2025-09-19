import { PgsqlPaymentM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IPaymentRepository = AbstractRepoI<PgsqlPaymentM> & {};
