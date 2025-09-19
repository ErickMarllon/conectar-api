import { PgsqlSessionM } from '@/infrastructure/database/pgsql';
import { Payload } from '../../auth/jwt';
import { PgsqlSession } from '../entities';
import { AbstractRepoI } from './base-entity.interface';

export type SessionPayloadInput = {
  sub: Partial<Payload['sub']>;
};
export type ISessionRepository = AbstractRepoI<PgsqlSessionM> & {
  findByUserId(input: string): Promise<PgsqlSession | null>;
  findOneByPayload(input: SessionPayloadInput): Promise<PgsqlSession | null>;
};
