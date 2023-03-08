import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { Controller, Post, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import EntityController from '../entity.controller';
import { AlbumDto } from './album.dto';
import { AlbumEntity } from './album.entity';

@Controller('album')
export class AlbumController extends EntityController<
  AlbumEntity,
  AlbumDto,
  AlbumDto
> {
  constructor(service: AlbumService) {
    super(service);
  }

  @Post()
  async create(@Body() createDto: AlbumDto) {
    return this.service.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: AlbumDto,
  ) {
    return this.service.update(id, updateDto).catch(this.exceptionHandler);
  }
}
