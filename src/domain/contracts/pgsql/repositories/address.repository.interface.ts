import { PgsqlAddress } from '../entities';
import { AbstractRepoI } from './base-entity.interface';

export type IAddressRepository = AbstractRepoI<PgsqlAddress>;
