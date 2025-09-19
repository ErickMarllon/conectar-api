import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlTenantM } from './tenant.entity';

@Entity('tenant_notification_setting')
export class PgsqlTenantNotificationSettingM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PgsqlTenantM, (tenant) => tenant.notificationSettings)
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: true })
  is_email: boolean;

  @Column({ default: true })
  is_sms: boolean;

  @Column({ default: true })
  is_push: boolean;

  @Column({ default: true })
  is_whatsapp: boolean;

  @Column({ default: false })
  notify_new_user: boolean;

  @Column({ default: false })
  notify_new_order: boolean;

  @Column({ default: false })
  notify_order_status: boolean;

  @Column({ default: false })
  notify_payment_received: boolean;

  @Column({ default: false })
  notify_invoice_created: boolean;

  @Column({ default: false })
  notify_service_schedule_status: boolean;

  @Column({ default: false })
  notify_service_schedule_reminder: boolean;

  @Column({ default: false })
  notify_low_stock: boolean;

  @Column({ default: false })
  notify_referral_reward: boolean;

  @Column({ default: false })
  notify_marketing_event: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
