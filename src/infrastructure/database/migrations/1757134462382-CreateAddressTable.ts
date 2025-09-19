import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddressTable1757134462382 implements MigrationInterface {
  name = 'CreateAddressTable1757134462382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "citext"');

    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
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
            default: `'BRASIL'`,
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
            name: 'IDX_address_id',
            columnNames: ['id'],
            isUnique: true,
          },
          {
            name: 'IDX_address_user_id',
            columnNames: ['user_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address');
  }
}
