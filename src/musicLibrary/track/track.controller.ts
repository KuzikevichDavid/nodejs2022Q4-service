import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackEntity } from 'src/musicLibrary/track/track.entity';
import EntityController from '../entity.controller';
import { TrackDto } from './track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController extends EntityController<
  TrackEntity,
  TrackDto,
  TrackDto
> {
  constructor(service: TrackService) {
    super(service);
  }

  @Post()
  async create(@Body() createDto: TrackDto) {
    return this.service.create(createDto).catch(this.exceptionHandler);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: TrackDto,
  ) {
    return this.service.update(id, updateDto).catch(this.exceptionHandler);
  }
}
