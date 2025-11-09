import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlanFeatureTable1756961092823 implements MigrationInterface {
  name = 'CreatePlanFeatureTable1756961092823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'plan_feature',
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
            name: 'feature_text',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'is_available',
            type: 'boolean',
            default: false,
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
            name: 'IDX_plan_feature_id',
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
    await queryRunner.dropTable('plan_feature');
  }
}
