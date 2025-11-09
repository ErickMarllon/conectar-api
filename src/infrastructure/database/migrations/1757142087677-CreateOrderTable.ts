import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderTable1757142087677 implements MigrationInterface {
  name = 'CreateOrderTable1757142087677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_method') THEN
      CREATE TYPE "payment_method" AS ENUM ('CASH','CREDIT_CARD','DEBIT_CARD','PIX');
    END IF;
  END$$;
`);

    await queryRunner.query(`
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'delivery_method_type') THEN
      CREATE TYPE "delivery_method_type" AS ENUM ('DELIVERY','PICKUP');
    END IF;
  END$$;
`);

    await queryRunner.createTable(
      new Table({
        name: 'order',
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
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'total_price',
            type: 'decimal',
            precision: 12,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'payment_method',
            type: 'payment_method',
            isNullable: false,
          },
          {
            name: 'DeliveryMethod',
            type: 'delivery_method_type',
            isNullable: false,
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
            columnNames: ['tenant_id'],
            referencedTableName: 'tenant',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
        ],
        indices: [
          {
            name: 'IDX_order_id',
            columnNames: ['id'],
            isUnique: true,
          },
          {
            name: 'IDX_order_tenant_id',
            columnNames: ['tenant_id'],
          },
          {
            name: 'IDX_order_user_id',
            columnNames: ['user_id'],
          },
          {
            name: 'IDX_order_status',
            columnNames: ['status'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order');
  }
}
