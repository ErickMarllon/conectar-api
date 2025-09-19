import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTenantTable1756961143001 implements MigrationInterface {
  name = 'CreateTenantTable1756961143001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "citext"');
    await queryRunner.query(`
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'TenantStatus') THEN
      CREATE TYPE "TenantStatus" AS  ENUM ('ACTIVE','INACTIVE','SUSPENDED','CANCELLED','EXPIRED');
    END IF;
  END$$;
`);

    await queryRunner.createTable(
      new Table({
        name: 'tenant',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'citext',
            isNullable: false,
          },
          {
            name: 'logo_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cover_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'slug',
            type: 'citext',
            isNullable: false,
          },
          {
            name: 'whatsapp',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'about',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'plan_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'TenantStatus',
            isNullable: false,
            default: "'ACTIVE'",
          },
          {
            name: 'enable_service_schedule',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'enable_google_calendar',
            type: 'boolean',
            isNullable: false,
            default: false,
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
            name: 'IDX_tenant_id',
            columnNames: ['id'],
            isUnique: true,
          },
          {
            name: 'IDX_tenant_name',
            columnNames: ['name'],
            isUnique: true,
          },
          {
            name: 'IDX_tenant_plan_id',
            columnNames: ['plan_id'],
          },
          {
            name: 'IDX_TenantStatus',
            columnNames: ['status'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['plan_id'],
            referencedTableName: 'plan',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
            name: 'FK_tenant_plan_id',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenant');
    await queryRunner.query(`DROP TYPE "TenantStatus"`);
  }
}
