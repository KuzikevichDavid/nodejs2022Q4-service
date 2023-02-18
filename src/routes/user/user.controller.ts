import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from 'src/utils/services/user.service';
import { UserEntity } from 'src/utils/services/user.entity';
import EntityController from '../entity.controller';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController extends EntityController<
  UserEntity,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(service: UserService) {
    super(service);
  }

  @Post()
  async create(@Body() createDto: CreateUserDto) {
    return this.service.create(createDto).catch(this.exceptionHandler);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.service.update(id, updateDto).catch(this.exceptionHandler);
  }
}
