import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID(4)
  id: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
