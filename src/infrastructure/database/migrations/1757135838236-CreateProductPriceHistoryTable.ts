import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductPriceHistoryTable1757135838236
  implements MigrationInterface
{
  name = 'CreateProductPriceHistoryTable1757135838236';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'product_price_history',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'discount_type',
            type: 'value_type',
            isNullable: true,
          },
          {
            name: 'discount_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
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
        ],
        indices: [
          {
            name: 'IDX_product_price_history_id',
            columnNames: ['id'],
            isUnique: true,
          },
          {
            name: 'IDX_product_price_history_product_id',
            columnNames: ['product_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['product_id'],
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_price_history');
  }
}
