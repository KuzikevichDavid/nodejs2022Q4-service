import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NotFound } from '../errors/notFound.error';
import { idNotFound } from '../replyMessages';
import { BaseEntity } from './entity';

export enum Operation {
  get = 'get by id',
  update = 'update',
  delete = 'delete',
}

export abstract class EntityService<
  TEntity extends BaseEntity,
  CreateEntityDto,
  UpdateEntityDto,
> {
  protected constructor(
    protected readonly entityName: string,
    protected readonly repository: Repository<TEntity>,
  ) {}

  public async getMany(): Promise<TEntity[]>;
  public async getMany(
    options: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[],
  ): Promise<TEntity[]>;
  public async getMany(
    options?: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[],
  ): Promise<TEntity[]> {
    if (!options) {
      return this.repository.find();
    }
    return this.repository.findBy(options);
  }

  async get(id: string): Promise<TEntity> {
    const entity = await this.repository.findOneBy({ id: id as any });
    if (!entity)
      throw new NotFound(Operation.get, idNotFound(this.entityName, id));
    return entity;
  }

  abstract create(entityDto: CreateEntityDto): Promise<TEntity>;

  async update(id: string, entityDto: UpdateEntityDto): Promise<TEntity> {
    const entity = await this.repository.findOneBy({ id: id as any });
    if (!entity)
      throw new NotFound(Operation.update, idNotFound(this.entityName, id));
    Object.assign(entity, entityDto);
    const updated = this.repository.save(entity);
    return updated;
  }

  async updateMany(
    options: FindOptionsWhere<TEntity>,
    partialEntity: QueryDeepPartialEntity<TEntity>,
  ): Promise<void> {
    this.repository.update(options, partialEntity);
  }

  async delete(id: string): Promise<TEntity> {
    const entity = await this.repository.findOneBy({ id: id as any });
    if (!entity)
      throw new NotFound(Operation.delete, idNotFound(this.entityName, id));
    await this.repository.delete({ id: id as any });
    return entity;
  }

  protected notFoundRefuseHandler(error: unknown) {
    if (!(error instanceof NotFound)) {
      throw error;
    }
  }
}
