import { PgsqlInvoiceM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IInvoiceRepository = AbstractRepoI<PgsqlInvoiceM> & {};
