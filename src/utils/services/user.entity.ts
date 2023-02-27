import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { BaseEntity } from './entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ nullable: true })
  refreshToken: string;

  @VersionColumn()
  version: number; // integer number, increments on update
  @Transform(({ value }) => value.getTime())
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // timestamp of creation
  @Transform(({ value }) => value.getTime())
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date; // timestamp of last update

  constructor(partial: Partial<UserEntity>) {
    super(partial);
  }
}
