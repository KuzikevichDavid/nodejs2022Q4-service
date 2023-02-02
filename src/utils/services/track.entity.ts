import { Entity } from "./entity"

export class TrackEntity extends Entity {
  name: string;
  duration: number;
  artistId: string;
  albumId: string;

  constructor(partial: Partial<TrackEntity>) {
    super(partial)
  }
};
