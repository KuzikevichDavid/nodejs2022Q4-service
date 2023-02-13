import { config } from "dotenv";
import { DataSource } from "typeorm";
import { AlbumEntity } from "../album.entity";
import { ArtistEntity } from "../artist.entity";
import { FavoritesEntity } from "../favorites.entity";
import { TrackEntity } from "../track.entity";
import { UserEntity } from "../user.entity";
import { initEntity1676227221502 } from "./migrations/1676227221502-initEntity";

config()

export const appDataSource = new DataSource({
  type: 'postgres',

  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: +process.env.POSTGRES_PORT || 5432,
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
  logging: true,
  subscribers: [],
  migrationsTableName: 'migration',

  migrations: [
    initEntity1676227221502,
  ],

  ssl: false,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
appDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error))
