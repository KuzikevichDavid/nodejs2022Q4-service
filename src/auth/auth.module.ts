import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logging/log.module';
import { appDataSource } from 'src/utils/services/db/dataSource';
import { UserEntity } from 'src/utils/services/user.entity';
import { UserService } from 'src/utils/services/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './authService';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenStrategy } from './refresh.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options),
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    LoggerModule,
    JwtModule.register({
      secret: process.env.SSH_CERT,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    }),
  ],
  providers: [UserService, AuthService, JwtStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
