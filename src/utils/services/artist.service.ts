import { Injectable } from '@nestjs/common';
import { ArtistDto } from '../../routes/artist/artist.dto';
import { genId } from '../idUtils';
import { ArtistEntity } from './artist.entity';
import { EntityService } from './entity.service';
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
}
