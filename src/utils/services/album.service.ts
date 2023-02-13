import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  constructor(
    @InjectRepository(AlbumEntity)
    repository: Repository<AlbumEntity>,
    // @InjectRepository(AlbumEntity)
    // repository: Repository<AlbumEntity>,
    protected readonly trackService: TrackService
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
    const deleted = await super.delete(id);
    await this.trackService.updateMany({ albumId: id }, { albumId: null });
    return deleted;
  }
}
