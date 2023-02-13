import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { BaseEntity } from './entity';

@Entity()
export class AlbumEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;
  @Column()
  year: number;

  @Exclude()
  @OneToOne(() => ArtistEntity)
  @JoinColumn({
    name: 'artistId',
    foreignKeyConstraintName: 'FK_album_to_artist_id',
    referencedColumnName: 'id',
  })
  artist: ArtistEntity;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  constructor(partial: Partial<AlbumEntity>) {
    super(partial);
  }
}
