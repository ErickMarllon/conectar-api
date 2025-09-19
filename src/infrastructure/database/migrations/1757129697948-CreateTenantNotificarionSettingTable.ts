import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTenantNotificarionSettingTable1757129697948
  implements MigrationInterface
{
  name = 'CreateTenantNotificarionSettingTable1757129697948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'tenant_notification_setting',
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
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'is_email',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'is_sms',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'is_push',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'is_whatsapp',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'notify_new_user',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'notify_new_order',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'notify_order_status',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'notify_payment_received',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'notify_invoice_created',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'notify_service_schedule_status',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'notify_service_schedule_reminder',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'notify_low_stock',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'notify_referral_reward',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'notify_marketing_event',
            type: 'boolean',
            isNullable: false,
            default: false,
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
    await queryRunner.dropTable('tenant_notification_setting');
  }
}
