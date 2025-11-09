import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlanDetailTable1756961092822 implements MigrationInterface {
  name = 'CreatePlanDetailTable1756961092822';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'plan_detail',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'plan_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'numeric',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'billing_period',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'cta_label',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'included_features',
            type: 'text',
            isArray: true,
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            name: 'IDX_plan_detail_id',
            columnNames: ['id'],
            isUnique: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['plan_id'],
            referencedTableName: 'plan',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plan_detail');
  }
}
