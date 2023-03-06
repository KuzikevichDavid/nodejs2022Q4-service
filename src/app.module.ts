import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoggingInterceptor } from './logging/loggingInterceptor';
import { LoggerModule } from './logging/log.module';
import { AlbumController } from './routes/album/album.controller';
import { ArtistController } from './routes/artist/artist.controller';
import { DocController } from './routes/doc.controller';
import { FavoritesController } from './routes/favs/favorites.controller';
import { TrackController } from './routes/track/track.controller';
import { UserController } from './routes/user/user.controller';
import { AllExceptionsFilter } from './logging/allExceptionFilter';
import { AlbumService } from './routes/album/album.service';
import { ArtistEntity } from './routes/artist/artist.entity';
import { appDataSource } from './utils/db/dataSource';
import { FavoritesEntity } from './routes/favs/favorites.entity';
import { TrackEntity } from './routes/track/track.entity';
import { UserEntity } from './routes/user/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocModule } from './doc.module';
import { AlbumEntity } from './routes/album/album.entity';
import { ArtistService } from './routes/artist/artist.service';
import { FavoritesService } from './routes/favs/favorites.service';
import { TrackService } from './routes/track/track.service';
import { UserService } from './routes/user/user.service';

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
    LoggerModule,
    DocModule,
  ],
  controllers: [
    UserController,
    TrackController,
    ArtistController,
    AlbumController,
    FavoritesController,
    DocController,
    AppController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    UserService,
    TrackService,
    ArtistService,
    AlbumService,
    FavoritesService,
    AppService,
  ],
})
export class AppModule {}
