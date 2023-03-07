import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { NotFound } from 'src/utils/errors/notFound.error';
import { FavoritesEntity } from 'src/musicLibrary/favs/favorites.entity';
import { FavoritesDto, FavoritesType } from './favorites.dto';
import { FavoritesService } from './favorites.service';

@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavoritesController {
  constructor(protected service: FavoritesService) {
    service.init();
  }

  @Get()
  async getFavorites(): Promise<FavoritesEntity> {
    return this.service.get();
  }

  @Post('/:type/:id')
  async add(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type') type: string,
  ) {
    const favsType: FavoritesType = type.toLowerCase() as FavoritesType;
    if (!favsType) throw new NotFoundException();
    return this.service
      .create(new FavoritesDto({ id: id, type: favsType }))
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
      .delete(new FavoritesDto({ id: id, type: favsType }))
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
