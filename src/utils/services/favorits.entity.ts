import { Entity } from './entity';

export class FavoritsEntity extends Entity {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids

  constructor(partial: Partial<FavoritsEntity>) {
    super(partial);
  }
}
