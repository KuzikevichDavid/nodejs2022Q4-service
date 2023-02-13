import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateEntities1676311784853 implements MigrationInterface {
  name = 'updateEntities1676311784853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "album_entity" DROP CONSTRAINT "artist_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" DROP CONSTRAINT "artist_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" DROP CONSTRAINT "album_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_entity" ADD CONSTRAINT "FK_album_to_artist_id" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" ADD CONSTRAINT "FK_track_to_artist_id" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" ADD CONSTRAINT "FK_track_to_album_id" FOREIGN KEY ("albumId") REFERENCES "album_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "track_entity" DROP CONSTRAINT "FK_track_to_album_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" DROP CONSTRAINT "FK_track_to_artist_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_entity" DROP CONSTRAINT "FK_album_to_artist_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" ADD CONSTRAINT "album_id" FOREIGN KEY ("albumId") REFERENCES "album_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" ADD CONSTRAINT "artist_id" FOREIGN KEY ("artistId", "artistId") REFERENCES "artist_entity"("id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_entity" ADD CONSTRAINT "artist_id" FOREIGN KEY ("artistId", "artistId") REFERENCES "artist_entity"("id","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
