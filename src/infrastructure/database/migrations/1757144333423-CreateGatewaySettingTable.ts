import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGatewaySettingTable1757144333423
  implements MigrationInterface
{
  name = 'CreateGatewaySettingTable1757144333423';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gateway_provider') THEN
          CREATE TYPE "gateway_provider" AS ENUM ('STRIPE', 'MERCADO_PAGO', 'PAYPAL','BSPAY');
        END IF;
      END$$;`,
    );
    await queryRunner.query(
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gateway_status') THEN
          CREATE TYPE "gateway_status" AS ENUM ('ACTIVE', 'INACTIVE');
        END IF;
      END$$;`,
    );
    await queryRunner.createTable(
      new Table({
        name: 'gateway_setting',
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
            name: 'provider',
            type: 'gateway_provider',
            isNullable: false,
          },
          {
            name: 'tenant_api_key',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'platform_referral_key',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'gateway_status',
            isNullable: false,
            default: `'ACTIVE'`,
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
            name: 'IDX_gateway_setting_tenant_id',
            columnNames: ['tenant_id'],
          },
          {
            name: 'IDX_gateway_setting_provider',
            columnNames: ['provider'],
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('gateway_setting');
  }
}
