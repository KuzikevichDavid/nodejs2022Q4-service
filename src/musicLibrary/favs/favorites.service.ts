import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FavoritesDto,
  FavoritesType,
} from 'src/musicLibrary/favs/favorites.dto';
import { NotFound } from 'src/utils/errors/notFound.error';
import { idNotFound } from 'src/utils/replyMessages';
import { Repository } from 'typeorm';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { BaseEntity } from '../entity';
import { EntityService, Operation } from '../entity.service';
import { TrackService } from '../track/track.service';
import { FavoritesEntity } from './favorites.entity';

@Injectable()
export class FavoritesService extends EntityService<
  FavoritesEntity,
  FavoritesDto,
  FavoritesDto
> {
  protected readonly entityName = 'favorites';
  protected readonly entities: FavoritesEntity[] = [];
  protected idx: string = null;

  constructor(
    @InjectRepository(FavoritesEntity)
    protected readonly repository: Repository<FavoritesEntity>,
    @Inject(forwardRef(() => TrackService))
    protected readonly tracks: TrackService,
    @Inject(forwardRef(() => ArtistService))
    protected readonly artists: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    protected readonly albums: AlbumService,
  ) {
    super('favorites', repository);
  }

  public async init() {
    let favs: FavoritesEntity = (await this.repository.find())[0];
    if (favs) {
      await this.repository.remove(favs);
    }
    favs = new FavoritesEntity({});
    favs = await this.repository.save(favs);
    this.idx = favs.id;
  }

  async get(): Promise<FavoritesEntity>;
  async get(id: string): Promise<FavoritesEntity>;
  public async get(id?: string): Promise<FavoritesEntity> {
    if (id) {
      return super.get(id);
    }
    return (
      await this.repository.find({
        relations: {
          albumEntities: true,
          artistEntities: true,
          trackEntities: true,
        },
      })
    )[0];
  }

  private async push(entity: BaseEntity, entityArray: BaseEntity[]) {
    if (!entityArray) entityArray = [];
    entityArray.push(entity);
  }

  private async remove(id: string, entityArray: BaseEntity[]) {
    const idx = entityArray.findIndex((idVal) => idVal.id === id);
    if (idx === -1)
      throw new NotFound(
        Operation.update,
        idNotFound(this.entityName + typeof entityArray, id),
      );
    return entityArray.splice(idx, 1);
  }

  async create(entityDto: FavoritesDto): Promise<FavoritesEntity> {
    const favs = await this.repository.findOne({
      where: { id: this.idx },
      relations: {
        albumEntities: true,
        artistEntities: true,
        trackEntities: true,
      },
    });
    switch (entityDto.type) {
      case FavoritesType.Track:
        const track = await this.tracks.get(entityDto.id);
        this.push(track, favs.trackEntities);
        break;
      case FavoritesType.Artist:
        const artist = await this.artists.get(entityDto.id);
        this.push(artist, favs.artistEntities);
        break;
      case FavoritesType.Album:
        const album = await this.albums.get(entityDto.id);
        this.push(album, favs.albumEntities);
        break;
      default:
        throw new RangeError('Unexpected value of enum `FavoritType`'); // or need TypeError
    }
    return this.repository.save(favs);
  }

  async delete(id: string): Promise<FavoritesEntity>;
  async delete(entityDto: Partial<FavoritesDto>): Promise<string>;
  public async delete(
    entityDto: string | Partial<FavoritesDto>,
  ): Promise<string | FavoritesEntity> {
    if (typeof entityDto === 'string') {
      return super.delete(entityDto);
    } else if (entityDto instanceof FavoritesDto) {
      const favs = await this.repository.findOne({
        where: { id: this.idx },
        relations: {
          albumEntities: true,
          artistEntities: true,
          trackEntities: true,
        },
      });
      switch (entityDto.type) {
        case FavoritesType.Track:
          await this.remove(entityDto.id, favs.trackEntities);
          break;
        case FavoritesType.Artist:
          await this.remove(entityDto.id, favs.artistEntities);
          break;
        case FavoritesType.Album:
          await this.remove(entityDto.id, favs.albumEntities);
          break;
        default:
          throw new RangeError('Unexpected value of enum `FavoritType`'); // or need TypeError
      }
      return this.repository.save(favs);
    }
  }
}
