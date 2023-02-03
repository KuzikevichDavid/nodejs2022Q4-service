import { Injectable } from '@nestjs/common';
import { ArtistDto } from '../../routes/artist/artist.dto';
import { genId } from '../idUtils';
import { ArtistEntity } from './artist.entity';
import { EntityService } from './entity.service';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

@Injectable()
export class ArtistService extends EntityService<
  ArtistEntity,
  ArtistDto,
  ArtistDto
> {
  constructor(protected trackService: TrackService) {
    super('artist');
  }

  async create(entityDto: ArtistDto): Promise<ArtistEntity> {
    const artist = new ArtistEntity({
      ...entityDto,
      id: genId(),
    });
    this.entities.push(artist);
    return artist;
  }

  async delete(id: string): Promise<ArtistEntity> {
    const deleted = await super.delete(id);
    const predicate = (track: TrackEntity) => track.artistId === id;
    for (const track of await this.trackService.getMany(predicate)) {
      track.artistId = null;
      this.trackService.update(track.id, track);
    }
    return deleted;
  }
}
