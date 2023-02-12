import { Exclude } from 'class-transformer';
import { Entity, Column, RelationId, JoinColumn, OneToOne } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { ArtistEntity } from './artist.entity';
import { BaseEntity } from './entity';

@Entity()
export class TrackEntity extends BaseEntity {
  @Column()
  name: string;
  @Column()
  duration: number;

  @Exclude()
  @OneToOne(() => ArtistEntity)
  @JoinColumn()
  artist: ArtistEntity;
  @RelationId((track: TrackEntity) => track.artist)
  artistId: string | null;

  @Exclude()
  @OneToOne(() => AlbumEntity)
  @JoinColumn()
  album: AlbumEntity;
  @RelationId((track: TrackEntity) => track.album)
  albumId: string | null;

  constructor(partial: Partial<TrackEntity>) {
    super(partial);
  }
}
