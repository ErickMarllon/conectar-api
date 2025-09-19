import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTenantSubscription1757144818534
  implements MigrationInterface
{
  name = 'CreateTenantSubscription1757144818534';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tenant_subscription_status') THEN
      CREATE TYPE "tenant_subscription_status" AS  ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'CANCELLED','EXPIRED');
    END IF;
  END$$;
`);
    await queryRunner.createTable(
      new Table({
        name: 'tenant_subscription',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'tenant_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'plan_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'amount_paid',
            type: 'decimal',
            precision: 12,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'start_date',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'end_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'paid_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'tenant_subscription_status',
            isNullable: false,
            default: `'ACTIVE'`,
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
            name: 'IDX_tenant_subscription_tenant_id',
            columnNames: ['tenant_id'],
          },
          {
            name: 'IDX_tenant_subscription_plan_id',
            columnNames: ['plan_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['tenant_id'],
            referencedTableName: 'tenant',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['plan_id'],
            referencedTableName: 'plan',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenant_subscription');
  }
}
