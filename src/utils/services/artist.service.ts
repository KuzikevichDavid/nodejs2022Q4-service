import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistDto } from '../../routes/artist/artist.dto';
import { ArtistEntity } from './artist.entity';
import { EntityService } from './entity.service';
import { TrackService } from './track.service';

@Injectable()
export class ArtistService extends EntityService<
  ArtistEntity,
  ArtistDto,
  ArtistDto
> {
  constructor(
    @InjectRepository(ArtistEntity)
    repository: Repository<ArtistEntity>,
    protected readonly trackService: TrackService,
  ) {
    super('artist', repository);
  }

  async create(entityDto: ArtistDto): Promise<ArtistEntity> {
    const artist = new ArtistEntity({
      ...entityDto,
    });
    return this.repository.save(artist);
  }

  async delete(id: string): Promise<ArtistEntity> {
    await this.trackService.updateMany({ artistId: id }, { artistId: null });
    const deleted = await super.delete(id);
    return deleted;
  }
}
