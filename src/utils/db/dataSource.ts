import { config } from 'dotenv';
import { AlbumEntity } from 'src/musicLibrary/album/album.entity';
import { DataSource } from 'typeorm';
import { ArtistEntity } from '../../musicLibrary/artist/artist.entity';
import { FavoritesEntity } from '../../musicLibrary/favs/favorites.entity';
import { TrackEntity } from '../../musicLibrary/track/track.entity';
import { UserEntity } from '../../user/user.entity';
import { init1676519107193 } from './migrations/1676519107193-init';
import { updateUserEntity1677507552283 } from './migrations/1677507552283-updateUserEntity';

config();

export const appDataSource = new DataSource({
  type: 'postgres',

  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,

  entities: [
    AlbumEntity,
    ArtistEntity,
    FavoritesEntity,
    TrackEntity,
    UserEntity,
  ],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrationsTableName: 'migration',
  migrationsRun: process.env.RUN_MIGRATIONS === 'true',
  migrations: [init1676519107193, updateUserEntity1677507552283],

  ssl: false,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
appDataSource
  .initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
