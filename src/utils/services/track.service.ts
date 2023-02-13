import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackDto } from 'src/routes/track/track.dto';
import { Repository } from 'typeorm';
import { EntityService } from './entity.service';
import { TrackEntity } from './track.entity';

@Injectable()
export class TrackService extends EntityService<
  TrackEntity,
  TrackDto,
  TrackDto
> {
  constructor(
    @InjectRepository(TrackEntity)
    repository: Repository<TrackEntity>,
  ) {
    super('track', repository);
  }

  async create(trackDto: TrackDto): Promise<TrackEntity> {
    const track: TrackEntity = new TrackEntity({
      ...trackDto,
    });
    return this.repository.save(track);
  }
}
