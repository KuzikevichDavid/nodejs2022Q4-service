import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateEntities1676310884658 implements MigrationInterface {
  name = 'updateEntities1676310884658';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "album_entity" DROP CONSTRAINT "FK_4aea5943406bd89eced202b012b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_entity" ADD CONSTRAINT "artist_id" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "album_entity" DROP CONSTRAINT "artist_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_entity" ADD CONSTRAINT "FK_4aea5943406bd89eced202b012b" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
