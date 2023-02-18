import { Entity } from './entity';

export class TrackEntity extends Entity {
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;

  constructor(partial: Partial<TrackEntity>) {
    super(partial);
  }
}
