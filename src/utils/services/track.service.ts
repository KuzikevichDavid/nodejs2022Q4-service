import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesDto, FavoritesType } from 'src/routes/favs/favorites.dto';
import { TrackDto } from 'src/routes/track/track.dto';
import { Repository } from 'typeorm';
import { EntityService } from './entity.service';
import { FavoritesService } from './favorites.service';
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
    @Inject(forwardRef(() => FavoritesService))
    protected readonly favoriteService: FavoritesService,
  ) {
    super('track', repository);
  }

  async create(trackDto: TrackDto): Promise<TrackEntity> {
    const track: TrackEntity = new TrackEntity({
      ...trackDto,
    });
    return this.repository.save(track);
  }

  async delete(id: string): Promise<TrackEntity> {
    await this.favoriteService
      .delete(new FavoritesDto({ id: id, type: FavoritesType.Track }))
      .catch(this.notFoundRefuseHandler);
    return super.delete(id);
  }
}
