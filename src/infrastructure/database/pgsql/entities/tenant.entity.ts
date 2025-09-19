import { TenantStatus } from '@/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlCategoryM } from './category.entity';
import { PgsqlPlanM } from './plan.entity';
import { PgsqlProductM } from './product.entity';
import { PgsqlServiceScheduleM } from './service-schedule.entity';
import { PgsqlServiceM } from './service.entity';
import { PgsqlSessionM } from './session.entity';
import { PgsqlTenantAddressM } from './tenant-address.entity';
import { PgsqlTenantNotificationSettingM } from './tenant-notification.entity';
import { PgsqlTenantSocialM } from './tenant-social.entity';
import { PgsqlTenantSubscriptionM } from './tenant-subscription.entity';
import { PgsqlUserM } from './user.entity';

@Entity('tenant')
export class PgsqlTenantM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  logo_url?: string;

  @Column({ nullable: true })
  cover_url?: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ nullable: true })
  phone_number: string;

  @ManyToOne(() => PgsqlPlanM)
  @JoinColumn({ name: 'plan_id' })
  plan: PgsqlPlanM;

  @Column({
    type: 'enum',
    enum: TenantStatus,
    default: 'ACTIVE',
  })
  status: string;

  @Column()
  about?: string;

  @Column({ default: false })
  enable_service_schedule: boolean;

  @Column({ default: false })
  enable_google_calendar: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => PgsqlTenantSubscriptionM, (sub) => sub.tenant)
  subscriptions: PgsqlTenantSubscriptionM[];

  @OneToMany(() => PgsqlTenantNotificationSettingM, (setting) => setting.tenant)
  notificationSettings: PgsqlTenantNotificationSettingM[];

  @OneToOne(() => PgsqlTenantSocialM, (social) => social.tenant)
  social: PgsqlTenantSocialM;

  @OneToMany(() => PgsqlUserM, (user) => user.tenant)
  users: PgsqlUserM[];

  @OneToMany(() => PgsqlSessionM, (session) => session.tenant)
  sessions: PgsqlSessionM[];

  @OneToMany(() => PgsqlCategoryM, (user) => user.tenant)
  categories: PgsqlCategoryM[];

  @OneToMany(() => PgsqlServiceM, (user) => user.tenant)
  services: PgsqlServiceM[];

  @OneToMany(() => PgsqlProductM, (user) => user.tenant)
  products: PgsqlProductM[];

  @OneToMany(
    () => PgsqlServiceScheduleM,
    (serviceSchedule) => serviceSchedule.service,
  )
  serviceSchedules: PgsqlServiceScheduleM[];

  @OneToMany(() => PgsqlTenantAddressM, (address) => address.tenant)
  addresses: PgsqlTenantAddressM[];
}
