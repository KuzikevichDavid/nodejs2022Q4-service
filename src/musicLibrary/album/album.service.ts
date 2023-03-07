import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FavoritesDto,
  FavoritesType,
} from 'src/musicLibrary/favs/favorites.dto';
import { Repository } from 'typeorm';
import { EntityService } from '../entity.service';
import { FavoritesService } from '../favs/favorites.service';
import { TrackService } from '../track/track.service';
import { AlbumDto } from './album.dto';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService extends EntityService<
  AlbumEntity,
  AlbumDto,
  AlbumDto
> {
  constructor(
    @InjectRepository(AlbumEntity)
    repository: Repository<AlbumEntity>,
    protected readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    protected readonly favoriteService: FavoritesService,
  ) {
    super('album', repository);
  }

  async create(entityDto: AlbumDto): Promise<AlbumEntity> {
    const entity = new AlbumEntity({
      ...entityDto,
    });
    return this.repository.save(entity);
  }

  async delete(id: string): Promise<AlbumEntity> {
    await this.favoriteService
      .delete(new FavoritesDto({ id: id, type: FavoritesType.Album }))
      .catch(this.notFoundRefuseHandler);
    await this.trackService.updateMany({ albumId: id }, { albumId: null });
    const deleted = await super.delete(id);
    return deleted;
  }
}
