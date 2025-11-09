import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGoogleCalendarSyncTable1757141471639
  implements MigrationInterface
{
  name = 'CreateGoogleCalendarSyncTable1757141471639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'service_schedule_status') THEN
          CREATE TYPE "service_schedule_status" AS ENUM ('PENDING','CONFIRMED','IN_PROGRESS','COMPLETED','CANCELLED');
        END IF;
      END$$;`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'google_calendar',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'service_schedule_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'google_event_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'synced_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'service_schedule_status',
            isNullable: false,
            default: `'PENDING'`,
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
            columnNames: ['service_schedule_id'],
            referencedTableName: 'service_schedule',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_google_calendar_id',
            columnNames: ['id'],
            isUnique: true,
          },
          {
            name: 'IDX_google_calendar_service_schedule_id',
            columnNames: ['service_schedule_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('google_calendar');
  }
}
