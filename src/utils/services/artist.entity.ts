import { Entity } from './entity';

export class ArtistEntity extends Entity {
  name: string;
  grammy: boolean;

  constructor(entity: Partial<ArtistEntity>) {
    super(entity);
  }
}
