import { Injectable } from '@nestjs/common';
import { AlbumDto } from '../../routes/album/album.dto';
import { genId } from '../idUtils';
import { AlbumEntity } from './album.entity';
import { EntityService } from './entity.service';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

@Injectable()
export class AlbumService extends EntityService<
  AlbumEntity,
  AlbumDto,
  AlbumDto
> {
  constructor(protected trackService: TrackService) {
    super('album');
  }

  async create(entityDto: AlbumDto): Promise<AlbumEntity> {
    const entity = new AlbumEntity({
      ...entityDto,
      id: genId(),
    });
    this.entities.push(entity);
    return entity;
  }

  async delete(id: string): Promise<AlbumEntity> {
    const deleted = await super.delete(id);
    const predicate = (track: TrackEntity) => track.albumId === id;
    for (const track of await this.trackService.getMany(predicate)) {
      track.albumId = null;
      this.trackService.update(track.id, track);
    }
    return deleted;
  }
}
