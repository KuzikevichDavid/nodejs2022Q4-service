import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "src/routes/user/user.dto";
import { Forbidden } from "../errors/forbidden.error";
import { NotFound } from "../errors/notFound.error";
import { genId } from "../idUtils";
import { idNotFound } from "../replyMessages";
import { Entity } from "./entity";
import { UserEntity } from "./user.entity";

export enum Operation {
  get = 'get by id',
  update = 'update',
  delete = 'delete',
}

@Injectable()
export abstract class EntityService<TEntity extends Entity, CreateEntityDto, UpdateEntityDto> {
  constructor(protected entityName: string) { }

  protected entities: TEntity[] = [];

  async getAll(): Promise<TEntity[]> {
    return this.entities;
  }

  async get(id: string): Promise<TEntity> {
    const resultIndex = this.entities.findIndex((user) => user.id === id);
    if (resultIndex === -1)
      throw new NotFound(Operation.get, idNotFound(this.entityName, id));
    return this.entities[resultIndex];
  }

  abstract create(userDto: CreateEntityDto): Promise<TEntity>;

  async update(id: string, userDto: UpdateEntityDto): Promise<TEntity> {
    const index = this.entities.findIndex((user) => user.id === id);
    if (index === -1)
      throw new NotFound(Operation.update, idNotFound(this.entityName, id));
    const user = this.entities[index];
    Object.assign(user, userDto);
    return user;
  }

  async delete(id: string) {
    const index = this.entities.findIndex((user) => user.id === id);
    if (index === -1)
      throw new NotFound(Operation.delete, idNotFound(this.entityName, id));
    this.entities.splice(index, 1);
  }
}