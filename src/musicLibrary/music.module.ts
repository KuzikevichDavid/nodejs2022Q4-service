import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSource } from 'src/utils/db/dataSource';
import { AlbumController } from './album/album.controller';
import { AlbumEntity } from './album/album.entity';
import { AlbumService } from './album/album.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistEntity } from './artist/artist.entity';
import { ArtistService } from './artist/artist.service';
import { FavoritesController } from './favs/favorites.controller';
import { FavoritesEntity } from './favs/favorites.entity';
import { FavoritesService } from './favs/favorites.service';
import { TrackController } from './track/track.controller';
import { TrackEntity } from './track/track.entity';
import { TrackService } from './track/track.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options),
    TypeOrmModule.forFeature([
      TrackEntity,
      ArtistEntity,
      AlbumEntity,
      FavoritesEntity,
    ]),
    UserModule,
  ],
  controllers: [
    TrackController,
    ArtistController,
    AlbumController,
    FavoritesController,
  ],
  providers: [TrackService, ArtistService, AlbumService, FavoritesService],
})
export class MusicLibraryModule {}
