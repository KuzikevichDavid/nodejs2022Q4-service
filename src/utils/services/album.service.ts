import { Injectable } from '@nestjs/common';
import { AlbumDto } from '../../routes/album/album.dto';
import { genId } from '../idUtils';
import { AlbumEntity } from './album.entity';
import { EntityService } from './entity.service';

@Injectable()
export class AlbumService extends EntityService<
  AlbumEntity,
  AlbumDto,
  AlbumDto
> {
  constructor() {
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
}
