import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NotFound } from 'src/utils/errors/notFound.error';
import { FavoritService } from 'src/utils/services/favorit.service';
import { FavoritReplyDto, FavoritType } from './favorits.dto';

@Controller('favs')
export class FavoritController {
  constructor(protected service: FavoritService) {}

  @Get()
  async getFavorites(): Promise<FavoritReplyDto> {
    return this.service.getEntities();
  }

  @Post('/track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.service
      .create({ id: id, type: FavoritType.Track })
      .catch(this.exceptionHandler);
  }

  @Post('/album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.service
      .create({ id: id, type: FavoritType.Album })
      .catch(this.exceptionHandler);
  }

  @Post('/artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.service
      .create({ id: id, type: FavoritType.Artist })
      .catch(this.exceptionHandler);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.service
      .delete({ id: id, type: FavoritType.Track })
      .catch(this.deleteExceptionHandler);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.service
      .delete({ id: id, type: FavoritType.Album })
      .catch(this.deleteExceptionHandler);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.service
      .delete({ id: id, type: FavoritType.Artist })
      .catch(this.deleteExceptionHandler);
  }

  private exceptionHandler(err: unknown) {
    if (err instanceof NotFound) {
      throw new UnprocessableEntityException(err.message);
    }

    throw err;
  }

  private deleteExceptionHandler(err: unknown) {
    if (err instanceof NotFound) {
      throw new NotFoundException(err.message);
    }

    throw err;
  }
}
