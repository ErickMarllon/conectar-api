import { NotificationEventStatus } from '@/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlEventTypeM } from './event-type.entity';
import { PgsqlOrderM } from './order.entity';
import { PgsqlServiceScheduleM } from './service-schedule.entity';
import { PgsqlTenantM } from './tenant.entity';
import { PgsqlUserM } from './user.entity';

@Entity('notification_event')
export class PgsqlNotificationEventM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PgsqlTenantM)
  tenant: PgsqlTenantM;

  @ManyToOne(() => PgsqlUserM, { nullable: true })
  user: PgsqlUserM;

  @ManyToOne(() => PgsqlServiceScheduleM, { nullable: true })
  service_schedule: PgsqlServiceScheduleM;

  @ManyToOne(() => PgsqlOrderM, { nullable: true })
  order: PgsqlOrderM;

  @ManyToOne(() => PgsqlEventTypeM)
  eventType: PgsqlEventTypeM;

  @Column({
    type: 'enum',
    enum: NotificationEventStatus,
    default: NotificationEventStatus.PENDING,
  })
  status: NotificationEventStatus;

  @Column({ type: 'timestamp with time zone', nullable: true })
  scheduled_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  sent_at: Date;

  @Column({ nullable: true })
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
