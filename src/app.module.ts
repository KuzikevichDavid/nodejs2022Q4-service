import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumController } from './routes/album/album.controller';
import { ArtistController } from './routes/artist/artist.controller';
import { DocController } from './routes/doc.controller';
import { FavoritesController } from './routes/favs/favorites.controller';
import { TrackController } from './routes/track/track.controller';
import { UserController } from './routes/user/user.controller';
import { AlbumService } from './utils/services/album.service';
import { ArtistService } from './utils/services/artist.service';
import { appDataSource } from './utils/services/db/dataSource';
import { FavoritesService } from './utils/services/favorites.service';
import { TrackService } from './utils/services/track.service';
import { UserService } from './utils/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options)
  ],
  controllers: [
    UserController,
    TrackController,
    ArtistController,
    AlbumController,
    FavoritesController,
    DocController,
  ],
  providers: [
    UserService,
    TrackService,
    ArtistService,
    AlbumService,
    FavoritesService,
  ],
})
export class AppModule {}
