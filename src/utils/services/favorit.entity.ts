import { Entity } from './entity';

export class FavoritEntity extends Entity {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids

  constructor(partial: Partial<FavoritEntity>) {
    super(partial);
  }
}
