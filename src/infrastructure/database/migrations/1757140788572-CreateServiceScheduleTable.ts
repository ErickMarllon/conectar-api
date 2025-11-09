import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateServiceScheduleTable1757140788572
  implements MigrationInterface
{
  name = 'CreateServiceScheduleTable1757140788572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'service_schedule_status') THEN
          CREATE TYPE "service_schedule_status" AS ENUM ('PENDING','CONFIRMED','IN_PROGRESS','COMPLETED','CANCELLED');
        END IF;
      END$$;`,
    );

    await queryRunner.query(
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'value_type') THEN
          CREATE TYPE "value_type" AS ENUM ('FIXED','PERCENTAGE');
        END IF;
      END$$;`,
    );

    await queryRunner.query(
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'paymentstatus') THEN
          CREATE TYPE "paymentstatus" AS ENUM ('PAID', 'FAILED', 'REFUNDED', 'PENDING', 'COMPLETED', 'CANCELED');
        END IF;
      END$$;`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'service_schedule',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'service_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id',
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
            type: 'service_schedule_status',
            isNullable: false,
            default: `'PENDING'`,
          },
          {
            name: 'deposit_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'total_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'deposit_type',
            type: 'value_type',
            isNullable: true,
          },
          {
            name: 'deposit_status',
            type: 'paymentstatus',
            isNullable: true,
            default: `'PENDING'`,
          },
          {
            name: 'notes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'deposit_paid_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'scheduled_at',
            type: 'timestamp with time zone',
            isNullable: false,
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
        foreignKeys: [
          {
            columnNames: ['service_id'],
            referencedTableName: 'service',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['tenant_id'],
            referencedTableName: 'tenant',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_service_schedule_service_id',
            columnNames: ['service_id'],
          },
          {
            name: 'IDX_service_schedule_user_id',
            columnNames: ['user_id'],
          },
          {
            name: 'IDX_service_schedule_tenant_id',
            columnNames: ['tenant_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('service_schedule');
  }
}
