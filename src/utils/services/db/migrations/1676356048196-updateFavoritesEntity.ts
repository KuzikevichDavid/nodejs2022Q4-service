import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateFavoritesEntity1676356048196 implements MigrationInterface {
  name = 'updateFavoritesEntity1676356048196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorite_artists" ("favoriteId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_1de5024c12aa915de63e05be5ae" PRIMARY KEY ("favoriteId", "artistId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_079cb7262aad856694c91e81a3" ON "favorite_artists" ("favoriteId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_82be0072b2a229420a57f08157" ON "favorite_artists" ("artistId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorite_albums" ("favoriteId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_18d07f1d15b2cdeefbc3af49151" PRIMARY KEY ("favoriteId", "albumId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fbcc288fba7e667798f5f00f91" ON "favorite_albums" ("favoriteId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9fe28ffb3ad15145d7d3b08503" ON "favorite_albums" ("albumId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorite_tracks" ("favoriteId" uuid NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_d42e69adda48943e62cd051d63e" PRIMARY KEY ("favoriteId", "trackId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b6487508928cc5f54fa66d4c2a" ON "favorite_tracks" ("favoriteId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6b0c7d487a618e839e987b3db1" ON "favorite_tracks" ("trackId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_artists" ADD CONSTRAINT "FK_favorite_artists_favoriteId" FOREIGN KEY ("favoriteId") REFERENCES "favorites_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_artists" ADD CONSTRAINT "FK_favorite_artists_artistId" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_albums" ADD CONSTRAINT "FK_favorite_albums_favoriteId" FOREIGN KEY ("favoriteId") REFERENCES "favorites_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_albums" ADD CONSTRAINT "FK_favorite_albums_albumId" FOREIGN KEY ("albumId") REFERENCES "album_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_tracks" ADD CONSTRAINT "FK_favorite_tracks_favoriteId" FOREIGN KEY ("favoriteId") REFERENCES "favorites_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_tracks" ADD CONSTRAINT "FK_favorite_tracks_trackId" FOREIGN KEY ("trackId") REFERENCES "track_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorite_tracks" DROP CONSTRAINT "FK_favorite_tracks_trackId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_tracks" DROP CONSTRAINT "FK_favorite_tracks_favoriteId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_albums" DROP CONSTRAINT "FK_favorite_albums_albumId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_albums" DROP CONSTRAINT "FK_favorite_albums_favoriteId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_artists" DROP CONSTRAINT "FK_favorite_artists_artistId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_artists" DROP CONSTRAINT "FK_favorite_artists_favoriteId"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6b0c7d487a618e839e987b3db1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b6487508928cc5f54fa66d4c2a"`,
    );
    await queryRunner.query(`DROP TABLE "favorite_tracks"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9fe28ffb3ad15145d7d3b08503"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fbcc288fba7e667798f5f00f91"`,
    );
    await queryRunner.query(`DROP TABLE "favorite_albums"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_82be0072b2a229420a57f08157"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_079cb7262aad856694c91e81a3"`,
    );
    await queryRunner.query(`DROP TABLE "favorite_artists"`);
  }
}
