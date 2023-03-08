import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @IsOptional()
  refreshToken: string;
}
