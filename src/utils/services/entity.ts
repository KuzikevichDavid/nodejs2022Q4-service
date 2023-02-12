import { PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  constructor(partial: Partial<BaseEntity>) {
    Object.assign(this, partial);
  }
}
