import { PgsqlAddressM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IUserAddressRepository = AbstractRepoI<PgsqlAddressM> & {};
