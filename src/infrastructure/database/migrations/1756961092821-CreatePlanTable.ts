import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlanTable1756961092821 implements MigrationInterface {
  name = 'CreatePlanTable1756961092821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "citext"');
    await queryRunner.query(`
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plan_interval') THEN
      CREATE TYPE "plan_interval" AS ENUM ('MONTHLY', 'ANNUALLY');
    END IF;
  END$$;
`);

    await queryRunner.createTable(
      new Table({
        name: 'plan',
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
            name: 'max_users',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'max_products',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'max_services',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'interval',
            type: 'plan_interval',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
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
            name: 'IDX_plan_name',
            columnNames: ['name'],
            isUnique: true,
          },
          {
            name: 'IDX_plan_id',
            columnNames: ['id'],
            isUnique: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plan');
    await queryRunner.query(`DROP TYPE "plan_interval"`);
  }
}
