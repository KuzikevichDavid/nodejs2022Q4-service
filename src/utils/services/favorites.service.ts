import { Injectable } from '@nestjs/common';
import {
  FavoritesDto,
  FavoritesReplyDto,
  FavoritesType,
} from 'src/routes/favs/favorites.dto';
import { NotFound } from '../errors/notFound.error';
import { genId } from '../idUtils';
import { idNotFound } from '../replyMessages';
import { AlbumService } from './album.service';
import { ArtistService } from './artist.service';
import { Entity } from './entity';
import { EntityService, Operation } from './entity.service';
import { FavoritesEntity } from './favorites.entity';
import { TrackService } from './track.service';

@Injectable()
export class FavoritesService {
  protected readonly entityName = 'favorites';
  protected readonly entities: FavoritesEntity[] = [];
  protected readonly idx: number = 0;

  constructor(
    protected readonly tracks: TrackService,
    protected readonly artists: ArtistService,
    protected readonly albums: AlbumService,
  ) {
    const favorits = new FavoritesEntity({
      id: genId(),
      albums: [],
      artists: [],
      tracks: [],
    });
    this.entities.push(favorits);
  }

  private async addToFavorits(
    service: EntityService<Entity, unknown, unknown>,
    idArray: string[],
    id: string,
  ) {
    await service.get(id);
    idArray.push(id);
    return id;
  }

  private async removeFromFavorits(idArray: string[], id: string) {
    const idx = idArray.findIndex((idVal) => idVal === id);
    if (idx === -1)
      throw new NotFound(Operation.update, idNotFound(this.entityName, id));
    return idArray.splice(idx, 1)[0];
  }

  public async getEntities(): Promise<FavoritesReplyDto> {
    const tracks = this.tracks.getMany((e: Entity) =>
      this.entities[this.idx].tracks.includes(e.id),
    );
    const artists = this.artists.getMany((e: Entity) =>
      this.entities[this.idx].artists.includes(e.id),
    );
    const albums = this.albums.getMany((e: Entity) =>
      this.entities[this.idx].albums.includes(e.id),
    );
    return {
      tracks: await tracks,
      artists: await artists,
      albums: await albums,
    };
  }

  public async create(entityDto: FavoritesDto): Promise<string> {
    switch (entityDto.type) {
      case FavoritesType.Track:
        return this.addToFavorits(
          this.tracks,
          this.entities[this.idx].tracks,
          entityDto.id,
        );
      case FavoritesType.Artist:
        return this.addToFavorits(
          this.artists,
          this.entities[this.idx].artists,
          entityDto.id,
        );
      case FavoritesType.Album:
        return this.addToFavorits(
          this.albums,
          this.entities[this.idx].albums,
          entityDto.id,
        );
      default:
        throw new RangeError('Unexpected value of enum `FavoritType`'); // or need TypeError
    }
  }

  public async delete(entityDto: FavoritesDto): Promise<string> {
    switch (entityDto.type) {
      case FavoritesType.Track:
        return this.removeFromFavorits(
          this.entities[this.idx].tracks,
          entityDto.id,
        );
      case FavoritesType.Artist:
        return this.removeFromFavorits(
          this.entities[this.idx].artists,
          entityDto.id,
        );
      case FavoritesType.Album:
        return this.removeFromFavorits(
          this.entities[this.idx].albums,
          entityDto.id,
        );
      default:
        throw new RangeError('Unexpected value of enum `FavoritType`'); // or need TypeError
    }
  }
}
