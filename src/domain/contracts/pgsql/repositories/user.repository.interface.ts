import { PgsqlUserM } from '@/infrastructure/database/pgsql';
import { UserStatus } from '@/shared/enums';
import { PaginateOptions, PaginateResponse } from '@/shared/paginate/types';
import { FindOptionsWhere } from 'typeorm';
import { Payload } from '../../auth/jwt';
import { PgsqlUser } from '../entities';
import { AbstractRepoI } from './base-entity.interface';
export type FindUsersParams = {
  searchTerm?: string;
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  cpf?: string;
  role?: string;
  is_verified?: boolean;
  status?: UserStatus;
  country_code?: string;
  area_code?: string;
  phone_number?: string;
  whatsapp?: string;
  zip_code?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  tenant?: string;
};

export type FindAllUsersParams = {
  filters?: FindUsersParams;
  searchTerm?: string;
  meta: PaginateOptions;
  currentUser: Payload['sub'];
};

export type FindOneByUsersParams = {
  where?: FindOptionsWhere<PgsqlUser>;
  relations?: string[];
};

export type PaginatedUsers = PaginateResponse<PgsqlUserM>;

export type IUserRepository = AbstractRepoI<PgsqlUserM> & {
  findAll(input: FindAllUsersParams): Promise<PaginatedUsers | undefined>;
  findManyByIds(ids: string[]): Promise<PgsqlUserM[]>;
  deleteMany(ids: string[]): Promise<void>;
  updateLastLogin(id: string): Promise<PgsqlUserM>;
};
