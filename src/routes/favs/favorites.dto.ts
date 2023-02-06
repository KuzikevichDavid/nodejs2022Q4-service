import { AlbumEntity } from 'src/utils/services/album.entity';
import { ArtistEntity } from 'src/utils/services/artist.entity';
import { TrackEntity } from 'src/utils/services/track.entity';

export enum FavoritesType {
  Track = 'track',
  Album = 'album',
  Artist = 'artist',
}

export class FavoritesDto {
  type: FavoritesType;
  id: string;
}

export class FavoritesReplyDto {
  tracks: TrackEntity[];
  albums: AlbumEntity[];
  artists: ArtistEntity[];
}
