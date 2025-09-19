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

import { UserStatus } from '@/shared/enums';
import { PgsqlNotificationEventM } from './notification-event.entity';
import { PgsqlProductReviewM } from './product-review.entity';
import { PgsqlRoleM } from './role.entity';
import { PgsqlServiceScheduleM } from './service-schedule.entity';
import { PgsqlSessionM } from './session.entity';
import { PgsqlTenantM } from './tenant.entity';
import { PgsqlAddressM } from './user-address.entity';
import { PgsqlUserSocialM } from './user-social.entity';

@Entity('user')
export class PgsqlUserM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  cpf_cnpj: string;

  @Column({ nullable: true })
  avatar_url?: string;

  @Column({ nullable: true })
  password?: string;

  @ManyToOne(() => PgsqlRoleM, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: PgsqlRoleM;

  @ManyToOne(() => PgsqlTenantM, (tenant) => tenant.users)
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  last_login_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => PgsqlSessionM, (session) => session.user)
  sessions: PgsqlSessionM[];

  @OneToMany(() => PgsqlAddressM, (address) => address.user)
  addresses: PgsqlAddressM[];

  @OneToOne(() => PgsqlUserSocialM, (social) => social.user)
  social: PgsqlUserSocialM;

  @OneToMany(() => PgsqlNotificationEventM, (event) => event.user)
  notificationEvents: PgsqlNotificationEventM[];

  @OneToMany(() => PgsqlProductReviewM, (review) => review.user)
  reviews: PgsqlProductReviewM[];

  @OneToMany(
    () => PgsqlServiceScheduleM,
    (serviceSchedule) => serviceSchedule.service,
  )
  serviceSchedules: PgsqlServiceScheduleM[];
}
