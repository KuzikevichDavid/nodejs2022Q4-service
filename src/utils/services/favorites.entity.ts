import { Exclude, Expose } from 'class-transformer';
import { Entity, ManyToMany, RelationId } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { ArtistEntity } from './artist.entity';
import { BaseEntity } from './entity';
import { TrackEntity } from './track.entity';

@Entity()
export class FavoritesEntity extends BaseEntity {
  @Expose({ name: 'artists' })
  @ManyToMany((type) => ArtistEntity)
  artistEntities: ArtistEntity[];
  @Exclude()
  @RelationId((favs: FavoritesEntity) => favs.artistEntities)
  artists: string[]; // favorite artists ids
  
  @Expose({ name: 'albums' })
  @ManyToMany((type) => AlbumEntity)
  albumEntities: AlbumEntity[];
  @Exclude()
  @RelationId((favs: FavoritesEntity) => favs.albumEntities)
  albums: string[]; // favorite albums ids
  
  @Expose({ name: 'tracks' })
  @ManyToMany((type) => TrackEntity)
  trackEntities: TrackEntity[];
  @Exclude()
  @RelationId((favs: FavoritesEntity) => favs.trackEntities)
  tracks: string[]; // favorite tracks ids

  constructor(partial: Partial<FavoritesEntity>) {
    super(partial);
  }
}
