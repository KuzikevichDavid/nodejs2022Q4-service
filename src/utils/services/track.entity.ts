import { Exclude } from 'class-transformer';
import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
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
  @JoinColumn({
    name: 'artistId',
    foreignKeyConstraintName: 'FK_track_to_artist_id',
    referencedColumnName: 'id',
  })
  artist: ArtistEntity;
  @Column({ nullable: true })
  artistId: string | null;

  @Exclude()
  @OneToOne(() => AlbumEntity)
  @JoinColumn({
    name: 'albumId',
    foreignKeyConstraintName: 'FK_track_to_album_id',
    referencedColumnName: 'id',
  })
  album: AlbumEntity;
  @Column({ nullable: true })
  albumId: string | null;

  constructor(partial: Partial<TrackEntity>) {
    super(partial);
  }
}
