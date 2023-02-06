import { Entity } from './entity';

export class FavoritesEntity extends Entity {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids

  constructor(partial: Partial<FavoritesEntity>) {
    super(partial);
  }
}
