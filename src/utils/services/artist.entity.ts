import { Column, Entity } from 'typeorm';
import { BaseEntity } from './entity';

@Entity()
export class ArtistEntity extends BaseEntity {
  @Column()
  name: string;
  @Column({ type: 'boolean', default: false })
  grammy: boolean;

  constructor(entity: Partial<ArtistEntity>) {
    super(entity);
  }
}
