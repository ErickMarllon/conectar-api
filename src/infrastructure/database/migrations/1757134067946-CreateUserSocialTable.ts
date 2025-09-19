import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserSocialTable1757134067946 implements MigrationInterface {
  name = 'CreateUserSocialTable1757134067946';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'user_social',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'provider_facebook',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'provider_instagram',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'provider_linkedin',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'provider_twitter',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()',
          },
        ],
        indices: [
          {
            name: 'IDX_user_social_id',
            columnNames: ['id'],
            isUnique: true,
          },
          {
            name: 'IDX_user_social_user_id',
            columnNames: ['user_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_social');
  }
}
