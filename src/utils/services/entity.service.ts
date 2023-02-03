import { NotFound } from '../errors/notFound.error';
import { idNotFound } from '../replyMessages';
import { Entity } from './entity';

export enum Operation {
  get = 'get by id',
  update = 'update',
  delete = 'delete',
}

export abstract class EntityService<
  TEntity extends Entity,
  CreateEntityDto,
  UpdateEntityDto,
> {
  protected constructor(protected readonly entityName: string) {}

  protected readonly entities: TEntity[] = [];

  public async getMany(): Promise<TEntity[]>;
  public async getMany(
    filterPredicate: (
      entity: TEntity,
      index: number,
      array: TEntity[],
    ) => boolean,
  ): Promise<TEntity[]>;
  public async getMany(
    filterPredicate?: (
      entity: TEntity,
      index: number,
      array: TEntity[],
    ) => boolean,
  ): Promise<TEntity[]> {
    if (!filterPredicate) {
      return this.entities;
    }
    return this.entities.filter(filterPredicate);
  }

  async get(id: string): Promise<TEntity> {
    const resultIndex = this.entities.findIndex((entity) => entity.id === id);
    if (resultIndex === -1)
      throw new NotFound(Operation.get, idNotFound(this.entityName, id));
    return this.entities[resultIndex];
  }

  abstract create(entityDto: CreateEntityDto): Promise<TEntity>;

  async update(id: string, entityDto: UpdateEntityDto): Promise<TEntity> {
    const index = this.entities.findIndex((entity) => entity.id === id);
    if (index === -1)
      throw new NotFound(Operation.update, idNotFound(this.entityName, id));
    const entity = this.entities[index];
    Object.assign(entity, entityDto);
    return entity;
  }

  async delete(id: string): Promise<TEntity> {
    const index = this.entities.findIndex((entity) => entity.id === id);
    if (index === -1)
      throw new NotFound(Operation.delete, idNotFound(this.entityName, id));
    return this.entities.splice(index, 1)[0];
  }
}
