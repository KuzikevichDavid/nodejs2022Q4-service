import { Module } from '@nestjs/common';
import { TrackController } from './routes/track/track.controller';
import { UserController } from './routes/user/user.controller';
import { TrackService } from './utils/services/track.service';
import { UserService } from './utils/services/user.service';

@Module({
  imports: [],
  controllers: [UserController, TrackController],
  providers: [UserService, TrackService],
})
export class AppModule { }
