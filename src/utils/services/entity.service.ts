import { Injectable } from '@nestjs/common';
import { NotFound } from '../errors/notFound.error';
import { idNotFound } from '../replyMessages';
import { Entity } from './entity';

export enum Operation {
  get = 'get by id',
  update = 'update',
  delete = 'delete',
}

@Injectable()
export abstract class EntityService<
  TEntity extends Entity,
  CreateEntityDto,
  UpdateEntityDto,
> {
  protected constructor(protected entityName: string) {}

  protected entities: TEntity[] = [];

  async getAll(): Promise<TEntity[]> {
    return this.entities;
  }

  /* async getMany(): Promise<TEntity[]> {
    return this.entities.filter()
  }*/

  async get(id: string): Promise<TEntity> {
    const resultIndex = this.entities.findIndex((entity) => entity.id === id);
    if (resultIndex === -1)
      throw new NotFound(Operation.get, idNotFound(this.entityName, id));
    return this.entities[resultIndex];
  }

  abstract create(entityDto: CreateEntityDto): Promise<TEntity>; /*{
    const entity: TEntity = {
      ...entityDto,
      id: genId(),
    };
    this.entities.push(entity);
    return entity;
  }*/

  async update(id: string, entityDto: UpdateEntityDto): Promise<TEntity> {
    const index = this.entities.findIndex((entity) => entity.id === id);
    if (index === -1)
      throw new NotFound(Operation.update, idNotFound(this.entityName, id));
    const entity = this.entities[index];
    Object.assign(entity, entityDto);
    return entity;
  }

  async delete(id: string) {
    const index = this.entities.findIndex((entity) => entity.id === id);
    if (index === -1)
      throw new NotFound(Operation.delete, idNotFound(this.entityName, id));
    this.entities.splice(index, 1);
  }
}
