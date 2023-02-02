import {
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  Controller,
} from '@nestjs/common';
import { BadRequest } from 'src/utils/errors/badRequest.error';
import { Forbidden } from 'src/utils/errors/forbidden.error';
import { NotFound } from 'src/utils/errors/notFound.error';
import { Entity } from 'src/utils/services/entity';
import { EntityService } from 'src/utils/services/entity.service';
import { CreateUserDto, UpdateUserDto } from './user/user.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export default abstract class EntityController<TEntity extends Entity, CreateEntityDto, UpdateEntityDto> {
  constructor(protected service: EntityService<TEntity, CreateEntityDto, UpdateEntityDto>) {
  }

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.get(id).catch(this.exceptionHandler);
  }

  abstract create(createDto: CreateEntityDto);

  abstract update(id: string, updateDto: UpdateEntityDto)

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id).catch(this.exceptionHandler);
  }

  protected async exceptionHandler(err: unknown) {
    if (err instanceof NotFound) {
      throw new NotFoundException(err.message);
    }
    if (err instanceof BadRequest) {
      throw new BadRequestException(err.message);
    }
    if (err instanceof Forbidden) {
      throw new ForbiddenException(err.message);
    }

    throw err;
  }
}
