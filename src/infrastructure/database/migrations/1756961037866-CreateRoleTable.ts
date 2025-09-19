import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoleTable1756961037866 implements MigrationInterface {
  name = 'CreateRoleTable1756961037866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "citext"');

    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'citext',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        indices: [
          {
            name: 'IDX_ROLE_ID',
            columnNames: ['id'],
          },
          {
            name: 'IDX_ROLE_NAME',
            columnNames: ['name'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM role WHERE name IN ('OWNER', 'ADMIN', 'MANAGER', 'EMPLOYEE', 'USER')
    `);
    await queryRunner.dropTable('role');
  }
}
