import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/routes/user/user.dto';
import { Forbidden } from '../errors/forbidden.error';
import { NotFound } from '../errors/notFound.error';
import { genId } from '../idUtils';
import { idNotFound } from '../replyMessages';
import { Operation, EntityService } from './entity.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService extends EntityService<UserEntity, CreateUserDto, UpdateUserDto> {
  constructor() {
    super('user');
  }
  //private entityName = 'user';
  //private entities: UserEntity[] = [];

  async getAll(): Promise<UserEntity[]> {
    return this.entities;
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
    this.entities.push(user);
    return user;
  }

  async update(id: string, userDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.get(id);
    if (userDto.oldPassword !== user.password) {
      throw new Forbidden(Operation.update, 'Old password not correct');
    }
    user.password = userDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return user;
  }
}
