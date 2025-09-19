import { DeepPartial, FindOptionsWhere } from 'typeorm';

export type RelationKeys<T> = {
  [K in keyof T]: T[K] extends object ? K : never;
}[keyof T];

export type FindOneWithRelationInput<T> = {
  where?: FindOptionsWhere<Partial<T>>;
  // relations?: (keyof T)[];
  relations?: string[];
};

export interface AbstractRepoI<T> {
  findAllRaw(input?: Partial<T>): Promise<T[]>;
  findOneBy(input?: Partial<T>): Promise<T | null>;
  findOneById(id: string): Promise<T | null>;
  findOneByWithRelation(input: FindOneWithRelationInput<T>): Promise<T | null>;
  create(data: DeepPartial<T | undefined>): Promise<T>;
  update(id: string, data: DeepPartial<T | undefined>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface BaseEntity {
  id: string;
}
