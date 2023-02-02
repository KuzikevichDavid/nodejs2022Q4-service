import { Exclude } from 'class-transformer';
import { Entity } from './entity';

export class UserEntity extends Entity {
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<UserEntity>) {
    super(partial)
  }
}
