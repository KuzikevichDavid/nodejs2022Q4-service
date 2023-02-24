import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AlbumController } from './routes/album/album.controller';
import { ArtistController } from './routes/artist/artist.controller';
import { DocController } from './routes/doc.controller';
import { FavoritesController } from './routes/favs/favorites.controller';
import { TrackController } from './routes/track/track.controller';
import { UserController } from './routes/user/user.controller';
import { AlbumEntity } from './utils/services/album.entity';
import { AlbumService } from './utils/services/album.service';
import { ArtistEntity } from './utils/services/artist.entity';
import { ArtistService } from './utils/services/artist.service';
import { appDataSource } from './utils/services/db/dataSource';
import { FavoritesEntity } from './utils/services/favorites.entity';
import { FavoritesService } from './utils/services/favorites.service';
import { TrackEntity } from './utils/services/track.entity';
import { TrackService } from './utils/services/track.service';
import { UserEntity } from './utils/services/user.entity';
import { UserService } from './utils/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options),
    TypeOrmModule.forFeature([
      UserEntity,
      TrackEntity,
      ArtistEntity,
      AlbumEntity,
      FavoritesEntity,
    ]),
    AuthModule,
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
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    UserService,
    TrackService,
    ArtistService,
    AlbumService,
    FavoritesService,
  ],
})
export class AppModule {}
