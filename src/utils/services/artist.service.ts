import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesDto, FavoritesType } from 'src/routes/favs/favorites.dto';
import { Repository } from 'typeorm';
import { ArtistDto } from '../../routes/artist/artist.dto';
import { AlbumService } from './album.service';
import { ArtistEntity } from './artist.entity';
import { EntityService } from './entity.service';
import { FavoritesService } from './favorites.service';
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
    @Inject(forwardRef(() => AlbumService))
    protected readonly albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    protected readonly favoriteService: FavoritesService,
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
    await this.favoriteService
      .delete(new FavoritesDto({ id: id, type: FavoritesType.Artist }))
      .catch(this.notFoundRefuseHandler);
    await this.albumService.updateMany({ artistId: id }, { artistId: null });
    await this.trackService.updateMany({ artistId: id }, { artistId: null });
    const deleted = await super.delete(id);
    return deleted;
  }
}
