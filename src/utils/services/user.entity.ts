import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, UpdateDateColumn, VersionColumn } from 'typeorm';
import { BaseEntity } from './entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @VersionColumn ()
  version: number; // integer number, increments on update
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number; // timestamp of creation
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<UserEntity>) {
    super(partial);
  }
}
