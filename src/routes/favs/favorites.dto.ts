export enum FavoritesType {
  Track = 'track',
  Album = 'album',
  Artist = 'artist',
}

export class FavoritesDto {
  type: FavoritesType;
  id: string;
  constructor(partial: Partial<FavoritesDto>) {
    Object.assign(this, partial);
  }
}
