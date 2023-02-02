import { Entity } from './entity';

export class AlbumEntity extends Entity {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
