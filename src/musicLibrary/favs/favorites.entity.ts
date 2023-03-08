import { Expose } from 'class-transformer';
import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artist/artist.entity';
import { BaseEntity } from '../entity';
import { TrackEntity } from '../track/track.entity';

@Entity()
export class FavoritesEntity extends BaseEntity {
  @Expose({ name: 'artists' })
  @ManyToMany(() => ArtistEntity)
  @JoinTable({
    name: 'favorite_artists',
    joinColumn: {
      name: 'favoriteId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_favorite_artists_favoriteId',
    },
    inverseJoinColumn: {
      name: 'artistId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_favorite_artists_artistId',
    },
  })
  artistEntities: ArtistEntity[];

  @Expose({ name: 'albums' })
  @ManyToMany(() => AlbumEntity)
  @JoinTable({
    name: 'favorite_albums',
    joinColumn: {
      name: 'favoriteId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_favorite_albums_favoriteId',
    },
    inverseJoinColumn: {
      name: 'albumId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_favorite_albums_albumId',
    },
  })
  albumEntities: AlbumEntity[];

  @Expose({ name: 'tracks' })
  @ManyToMany(() => TrackEntity, {})
  @JoinTable({
    name: 'favorite_tracks',
    joinColumn: {
      name: 'favoriteId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_favorite_tracks_favoriteId',
    },
    inverseJoinColumn: {
      name: 'trackId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_favorite_tracks_trackId',
    },
  })
  trackEntities: TrackEntity[];

  constructor(partial: Partial<FavoritesEntity>) {
    super(partial);
  }
}
