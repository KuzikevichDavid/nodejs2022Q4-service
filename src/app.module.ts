import { Module } from '@nestjs/common';
import { AlbumController } from './routes/album/album.controller';
import { ArtistController } from './routes/artist/artist.controller';
import { TrackController } from './routes/track/track.controller';
import { UserController } from './routes/user/user.controller';
import { AlbumService } from './utils/services/album.service';
import { ArtistService } from './utils/services/artist.service';
import { TrackService } from './utils/services/track.service';
import { UserService } from './utils/services/user.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    TrackController,
    ArtistController,
    AlbumController,
  ],
  providers: [UserService, TrackService, ArtistService, AlbumService],
})
export class AppModule {}
