import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTenantSocialTable1757130042467
  implements MigrationInterface
{
  name = 'CreateTenantSocialTable1757130042467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'tenant_social',
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
            name: 'provider_facebook',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'provider_instagram',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'provider_linkedin',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'provider_twitter',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
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
        indices: [
          {
            name: 'IDX_tenant_social_id',
            columnNames: ['id'],
            isUnique: true,
          },
          {
            name: 'IDX_tenant_social_tenant_id',
            columnNames: ['tenant_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenant_social');
  }
}
