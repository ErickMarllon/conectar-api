import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePaymentTable1757143542866 implements MigrationInterface {
  name = 'CreatePaymentTable1757143542866';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gateway_provider') THEN
          CREATE TYPE "gateway_provider" AS ENUM ('STRIPE', 'MERCADO_PAGO', 'PAYPAL','BSPAY');
        END IF;
      END$$;`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'payment',
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
            name: 'invoice_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'service_schedule_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'gateway',
            type: 'gateway_provider',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'paymentstatus',
            isNullable: false,
            default: `'PENDING'`,
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'paid_at',
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
            name: 'IDX_payment_tenant_id',
            columnNames: ['tenant_id'],
          },
          {
            name: 'IDX_payment_invoice_id',
            columnNames: ['invoice_id'],
          },
          {
            name: 'IDX_payment_service_schedule_id',
            columnNames: ['service_schedule_id'],
          },
          {
            name: 'IDX_paymentstatus',
            columnNames: ['status'],
          },
          {
            name: 'IDX_payment_paid_at',
            columnNames: ['paid_at'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['tenant_id'],
            referencedTableName: 'tenant',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['invoice_id'],
            referencedTableName: 'invoice',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['service_schedule_id'],
            referencedTableName: 'service_schedule',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payment');
  }
}
