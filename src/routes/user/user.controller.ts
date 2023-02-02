import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/utils/users/user.service';
import { UserEntity } from 'src/utils/users/user.entity';
import EntityController from '../entity.controller';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController extends EntityController {
  private users: UserEntity[] = [];
  constructor(protected userService: UserService) {
    super();
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.get(id).catch(this.exceptionHandler);
  }

  @Post()
  async create(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto).catch(this.exceptionHandler);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateDto).catch(this.exceptionHandler);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id).catch(this.exceptionHandler);
  }
}
