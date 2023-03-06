import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserEntity1677507552283 implements MigrationInterface {
  name = 'updateUserEntity1677507552283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" DROP COLUMN "refreshToken"`,
    );
  }
}
