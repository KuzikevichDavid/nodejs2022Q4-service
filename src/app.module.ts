import { Module } from '@nestjs/common';
import { UserController } from './routes/user/user.controller';
import { UserService } from './utils/users/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule { }
