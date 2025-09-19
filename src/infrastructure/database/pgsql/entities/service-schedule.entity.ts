import {
  PaymentStatus,
  ServiceScheduleStatus,
  ValueType,
} from '@/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlGoogleCalendarM } from './google-calendar.entity';
import { PgsqlServiceM } from './service.entity';
import { PgsqlTenantM } from './tenant.entity';
import { PgsqlUserM } from './user.entity';

@Entity('service_schedule')
export class PgsqlServiceScheduleM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  service_id: string;

  @ManyToOne(() => PgsqlServiceM, (service) => service.schedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: PgsqlServiceM;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => PgsqlUserM, (user) => user.serviceSchedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: PgsqlUserM;

  @Column({ type: 'uuid' })
  tenant_id: string;

  @ManyToOne(() => PgsqlTenantM, (tenant) => tenant.serviceSchedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @Column({
    type: 'enum',
    enum: ServiceScheduleStatus,
    default: ServiceScheduleStatus.PENDING,
  })
  status: ServiceScheduleStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  deposit_amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @Column({ type: 'enum', enum: ValueType, nullable: true })
  deposit_type: ValueType;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  deposit_status: PaymentStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deposit_paid_at: Date;

  @Column({ type: 'timestamp with time zone' })
  scheduled_at: Date;

  @OneToMany(
    () => PgsqlGoogleCalendarM,
    (calendar) => calendar.service_schedule,
  )
  googleCalendar: PgsqlGoogleCalendarM[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
