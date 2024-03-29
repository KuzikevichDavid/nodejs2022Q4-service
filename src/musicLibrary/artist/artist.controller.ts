import { ParseUUIDPipe } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ArtistEntity } from './artist.entity';
import EntityController from '../entity.controller';
import { ArtistDto } from './artist.dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController extends EntityController<
  ArtistEntity,
  ArtistDto,
  ArtistDto
> {
  constructor(service: ArtistService) {
    super(service);
  }

  @Post()
  async create(@Body() createDto: ArtistDto) {
    return this.service.create(createDto).catch(this.exceptionHandler);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: ArtistDto,
  ) {
    return this.service.update(id, updateDto).catch(this.exceptionHandler);
  }
}
