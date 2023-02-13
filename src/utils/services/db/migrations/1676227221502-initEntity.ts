import { MigrationInterface, QueryRunner } from 'typeorm';

export class initEntity1676227221502 implements MigrationInterface {
  name = 'initEntity1676227221502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "artist_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c6ec16b57b60c8096406808021d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "album_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "REL_4aea5943406bd89eced202b012" UNIQUE ("artistId"), CONSTRAINT "PK_319a74c2085b42849b15412a3bf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "REL_3cfbf55ef8a58b6447c226d226" UNIQUE ("artistId"), CONSTRAINT "REL_f75df6098780938c05b7a65d2c" UNIQUE ("albumId"), CONSTRAINT "PK_9cc0e8a743e689434dac0130098" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_e42953e6be13870839a04a3fa88" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_entity" ADD CONSTRAINT "FK_4aea5943406bd89eced202b012b" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" ADD CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" ADD CONSTRAINT "FK_f75df6098780938c05b7a65d2ca" FOREIGN KEY ("albumId") REFERENCES "album_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "track_entity" DROP CONSTRAINT "FK_f75df6098780938c05b7a65d2ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" DROP CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_entity" DROP CONSTRAINT "FK_4aea5943406bd89eced202b012b"`,
    );
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TABLE "favorites_entity"`);
    await queryRunner.query(`DROP TABLE "track_entity"`);
    await queryRunner.query(`DROP TABLE "album_entity"`);
    await queryRunner.query(`DROP TABLE "artist_entity"`);
  }
}
