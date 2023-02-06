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
import { FavoritesService } from 'src/utils/services/favorites.service';
import { FavoritesReplyDto, FavoritesType } from './favorites.dto';

@Controller('favs')
export class FavoritesController {
  constructor(protected service: FavoritesService) {}

  @Get()
  async getFavorites(): Promise<FavoritesReplyDto> {
    return this.service.getEntities();
  }

  @Post('/:type/:id')
  async add(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type') type: string,
  ) {
    const favsType: FavoritesType = type.toLowerCase() as FavoritesType;
    if (!favsType) throw new NotFoundException();
    return this.service
      .create({ id: id, type: favsType })
      .catch(this.exceptionHandler);
  }

  @Delete('/:type/:id')
  @HttpCode(204)
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type') type: string,
  ) {
    const favsType: FavoritesType = type.toLowerCase() as FavoritesType;
    if (!favsType) throw new NotFoundException();
    return this.service
      .delete({ id: id, type: favsType })
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
