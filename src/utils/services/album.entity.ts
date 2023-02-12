import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
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
  @JoinColumn()
  artist: ArtistEntity;

  @RelationId((album: AlbumEntity) => album.artist)
  artistId: string | null; // refers to Artist
}
