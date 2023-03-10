import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/routes/user/user.dto';
import { Repository } from 'typeorm';
import { Forbidden } from '../errors/forbidden.error';
import { Operation, EntityService } from './entity.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService extends EntityService<
  UserEntity,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(UserEntity)
    usersRepository: Repository<UserEntity>,
  ) {
    super('user', usersRepository);
  }

  async getMany(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity({
      login: userDto.login,
      password: userDto.password,
    });
    const createdUser = await this.repository.save(user);
    return createdUser;
  }

  async update(id: string, userDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.get(id);
    if (userDto.oldPassword !== user.password) {
      throw new Forbidden(Operation.update, 'Old password not correct');
    }
    user.password = userDto.newPassword;
    const result = await this.repository.save(user);
    return result;
  }
}
