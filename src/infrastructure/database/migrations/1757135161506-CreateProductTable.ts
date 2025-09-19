import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductTable1757135161506 implements MigrationInterface {
  name = 'CreateProductTable1757135161506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "citext"`);
    await queryRunner.query(`
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ValueType') THEN
      CREATE TYPE "ValueType" AS ENUM ('FIXED', 'PERCENTAGE');
    END IF;
  END$$;
`);
    await queryRunner.createTable(
      new Table({
        name: 'product',
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
            name: 'sku',
            type: 'citext',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'citext',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 12,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'sold_quantity',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'reserved_quantity',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'available',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'tenant_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'discount_type',
            type: 'ValueType',
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
            name: 'final_price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'total_rating',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'total_review',
            type: 'decimal',
            precision: 10,
            scale: 2,
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
            name: 'IDX_product_tenant_id',
            columnNames: ['tenant_id'],
          },
          {
            name: 'IDX_product_category_id',
            columnNames: ['category_id'],
          },
          {
            name: 'IDX_product_sku_tenant',
            columnNames: ['sku', 'tenant_id'],
            isUnique: true,
          },
          {
            name: 'IDX_product_name_tenant',
            columnNames: ['name', 'tenant_id'],
            isUnique: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['category_id'],
            referencedTableName: 'category',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product');
  }
}
