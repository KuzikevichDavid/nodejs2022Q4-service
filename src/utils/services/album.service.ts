import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesDto, FavoritesType } from 'src/routes/favs/favorites.dto';
import { Repository } from 'typeorm';
import { AlbumDto } from '../../routes/album/album.dto';
import { AlbumEntity } from './album.entity';
import { EntityService } from './entity.service';
import { FavoritesService } from './favorites.service';
import { TrackService } from './track.service';

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
