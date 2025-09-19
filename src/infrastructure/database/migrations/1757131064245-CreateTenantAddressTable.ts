import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTenantAddressTable1757131064245
  implements MigrationInterface
{
  name = 'CreateTenantAddressTable1757131064245';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "citext"');

    await queryRunner.createTable(
      new Table({
        name: 'tenant_address',
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
            name: 'zip_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'street',
            type: 'citext',
            isNullable: false,
          },
          {
            name: 'street_number',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'neighborhood',
            type: 'citext',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'citext',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'citext',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'citext',
            isNullable: false,
            default: "'Brasil'",
          },
          {
            name: 'is_default',
            type: 'boolean',
            isNullable: false,
            default: true,
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
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenant_address');
  }
}
