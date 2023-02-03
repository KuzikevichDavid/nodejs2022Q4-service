import { AlbumEntity } from 'src/utils/services/album.entity';
import { ArtistEntity } from 'src/utils/services/artist.entity';
import { TrackEntity } from 'src/utils/services/track.entity';

export enum FavoritType {
  Track,
  Album,
  Artist,
}

export class FavoritDto {
  type: FavoritType;
  id: string;
}

export class FavoritReplyDto {
  tracks: TrackEntity[];
  albums: AlbumEntity[];
  artists: ArtistEntity[];
}
