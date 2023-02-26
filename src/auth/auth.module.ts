import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { appDataSource } from 'src/utils/services/db/dataSource';
import { UserEntity } from 'src/utils/services/user.entity';
import { UserService } from 'src/utils/services/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './authService';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options),
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: readFileSync(process.env.SSH_PRIVKEY || 'localhost-privkey.pem'),
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
        algorithm: 'RS512',
      },
    }),
  ],
  providers: [UserService, AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}