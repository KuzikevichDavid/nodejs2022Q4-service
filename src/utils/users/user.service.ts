import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/routes/user/user.dto';
import { Forbidden } from '../errors/forbidden.error';
import { NotFound } from '../errors/notFound.error';
import { genId } from '../idUtils';
import { idNotFound } from '../replyMessages';
import { UserEntity } from './user.entity';

enum Operation {
  get = 'get by id',
  update = 'update',
  delete = 'delete',
}

@Injectable()
export class UserService {
  private entityName = 'user';
  private users: UserEntity[] = [];

  async getAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async get(id: string): Promise<UserEntity> {
    const resultIndex = this.users.findIndex((user) => user.id === id);
    if (resultIndex === -1)
      throw new NotFound(Operation.get, idNotFound(this.entityName, id));
    return this.users[resultIndex];
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const date = Date.now();
    const user: UserEntity = new UserEntity({
      id: genId(),
      login: userDto.login,
      password: userDto.password,
      createdAt: date,
      updatedAt: date,
      version: 1,
    });
    this.users.push(user);
    return user;
  }

  async update(id: string, userDto: UpdateUserDto): Promise<UserEntity> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1)
      throw new NotFound(Operation.update, idNotFound(this.entityName, id));
    const user = this.users[index];
    if (userDto.oldPassword !== user.password) {
      throw new Forbidden(Operation.update, 'Old password not correct');
    }
    user.password = userDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return user;
  }

  async delete(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1)
      throw new NotFound(Operation.delete, idNotFound(this.entityName, id));
    this.users.splice(index, 1);
  }
}
