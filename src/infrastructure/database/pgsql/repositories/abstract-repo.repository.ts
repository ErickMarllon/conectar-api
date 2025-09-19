import {
  AbstractRepoI,
  BaseEntity,
} from '@/domain/contracts/pgsql/repositories/base-entity.interface';
import { NotFoundException } from '@nestjs/common';

import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

export abstract class AbstractRepository<T extends BaseEntity>
  implements AbstractRepoI<T>
{
  protected constructor(protected readonly repository: Repository<T>) {}

  async findAllRaw(input?: Partial<T>): Promise<T[]> {
    if (input) {
      const where: FindOptionsWhere<T> = { ...input } as FindOptionsWhere<T>;
      return this.repository.find({ where });
    }
    return this.repository.find();
  }

  async findOneBy(input?: Partial<T>): Promise<T | null> {
    if (!input) return null;
    const where: FindOptionsWhere<T> = { ...input } as FindOptionsWhere<T>;
    return this.repository.findOneBy(where);
  }

  async findOneByWithRelation(input: {
    where?: FindOptionsWhere<Partial<T>>;
    relations?: string[];
  }): Promise<T | null> {
    if (!input) return null;

    return this.repository.findOne({
      where: input.where as FindOptionsWhere<T>,
      relations: input.relations as string[],
    });
  }

  async findOneById(id: string): Promise<T> {
    const where: FindOptionsWhere<T> = { id } as FindOptionsWhere<T>;
    const entity = await this.repository.findOne({ where });
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findOneById(id);
    const mergedEntity = this.repository.merge(entity, data);
    return this.repository.save(mergedEntity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.findOneById(id);
    await this.repository.remove(entity);
  }
}
