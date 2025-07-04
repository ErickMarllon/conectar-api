import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFieldsToUser1751601441876 implements MigrationInterface {
  name = 'AddFieldsToUser1751601441876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'country_code',
        type: 'varchar',
        length: '5',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'area_code',
        type: 'varchar',
        length: '5',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        length: '20',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'whatsapp',
        type: 'varchar',
        length: '15',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
        length: '11',
        isNullable: true,
        default: null,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'country_code');
    await queryRunner.dropColumn('user', 'area_code');
    await queryRunner.dropColumn('user', 'phone');
    await queryRunner.dropColumn('user', 'whats_app');
    await queryRunner.dropColumn('user', 'cpf');
  }
}
