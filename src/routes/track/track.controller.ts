import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackEntity } from 'src/utils/services/track.entity';
import { TrackService } from 'src/utils/services/track.service';
import EntityController from '../entity.controller';
import { TrackDto } from './track.dto';

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
