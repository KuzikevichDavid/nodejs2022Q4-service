import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './authService';
import { LoginDto, RefreshTokenDto, SignUpDto } from './authDto';
import { AllowAnon } from './anonymous.decorator';
import { RefreshTokenGuard } from './refresh-auth.guard';
import { ForbiddenException } from '@nestjs/common/exceptions';

@AllowAnon()
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.login,
      loginDto.password,
    );
    if (!user) {
      throw new ForbiddenException('login or password are incorrect');
    }
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto.login, signupDto.password);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshDto: RefreshTokenDto) {
    if (!refreshDto || !refreshDto?.refreshToken)
      throw new UnauthorizedException('Request body invalid');
    return this.authService.refresh(refreshDto.refreshToken);
  }
}
