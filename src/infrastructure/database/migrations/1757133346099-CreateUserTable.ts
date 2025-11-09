import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1757133346099 implements MigrationInterface {
  name = 'CreateUserTable1757133346099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "citext"`);
    await queryRunner.query(`
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
      CREATE TYPE "user_status" AS ENUM ('ACTIVE', 'PENDING','BANNED');
    END IF;
  END$$;
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
            type: 'citext',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'citext',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'citext',
            isNullable: false,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cpf_cnpj',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'avatar_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'tenant_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'user_status',
            isNullable: false,
            default: `'ACTIVE'`,
          },
          {
            name: 'is_verified',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'last_login_at',
            type: 'timestamp with time zone',
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
            name: 'IDX_user_id',
            columnNames: ['id'],
            isUnique: true,
          },

          {
            name: 'IDX_user_tenant_id',
            columnNames: ['tenant_id'],
          },
          {
            name: 'IDX_user_role_id',
            columnNames: ['role_id'],
          },
          {
            name: 'IDX_user_email_tenant',
            columnNames: ['email', 'tenant_id'],
            isUnique: true,
          },
          {
            name: 'IDX_user_cpf_cnpj',
            columnNames: ['cpf_cnpj', 'tenant_id'],
            isUnique: true,
            where: 'cpf_cnpj IS NOT NULL',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['role_id'],
            referencedTableName: 'role',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['tenant_id'],
            referencedTableName: 'tenant',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
