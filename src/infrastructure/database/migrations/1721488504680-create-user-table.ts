import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1721488504680 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "user_role_enum" AS ENUM ('USER', 'ADMIN');
    `);

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'first_name',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'character varying',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'picture',
            type: 'character varying',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'character varying',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'user_role_enum',
            isNullable: false,
            default: `'USER'`,
          },
          {
            name: 'last_login_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
  }
}
