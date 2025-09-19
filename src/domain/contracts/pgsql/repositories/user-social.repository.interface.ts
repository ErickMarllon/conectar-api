import { PgsqlUserSocialM } from '@/infrastructure/database/pgsql';
import { AbstractRepoI } from './base-entity.interface';

export type IUserSocialRepository = AbstractRepoI<PgsqlUserSocialM> & {};
