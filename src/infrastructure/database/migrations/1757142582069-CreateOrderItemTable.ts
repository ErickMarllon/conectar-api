import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderItemTable1757142582069 implements MigrationInterface {
  name = 'CreateOrderItemTable1757142582069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'order_item',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'service_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: false,
            default: 1,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 12,
            scale: 2,
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
            columnNames: ['order_id'],
            referencedTableName: 'order',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['product_id'],
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['service_id'],
            referencedTableName: 'service',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
        ],
        indices: [
          {
            name: 'IDX_order_item_id',
            columnNames: ['id'],
            isUnique: true,
          },
          {
            name: 'IDX_order_item_order_id',
            columnNames: ['order_id'],
          },
          {
            name: 'IDX_order_item_product_id',
            columnNames: ['product_id'],
          },
          {
            name: 'IDX_order_item_service_id',
            columnNames: ['service_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_item');
  }
}
