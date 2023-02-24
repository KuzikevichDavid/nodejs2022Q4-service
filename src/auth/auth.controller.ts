import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './authService';
import { LoginDto, SignUpDto } from './authDto';
import { UserService } from 'src/utils/services/user.service';
import { AllowAnon } from './anonymous.decorator';

@AllowAnon()
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.login,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('login or password are incorrect');
    }
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    return this.userService.create({
      login: signupDto.login,
      password: signupDto.password,
    });
  }
}
