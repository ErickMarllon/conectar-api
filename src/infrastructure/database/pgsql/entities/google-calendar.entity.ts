import { ServiceScheduleStatus } from '@/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlServiceScheduleM } from './service-schedule.entity';

@Entity('google_calendar')
export class PgsqlGoogleCalendarM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => PgsqlServiceScheduleM,
    (schedule) => schedule.googleCalendar,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  service_schedule: PgsqlServiceScheduleM;

  @Column()
  service_schedule_id: string;

  @Column()
  google_event_id: string;

  @Column({ type: 'timestamptz', nullable: true })
  synced_at: Date;

  @Column({
    type: 'enum',
    enum: ServiceScheduleStatus,
    default: ServiceScheduleStatus.PENDING,
  })
  status: ServiceScheduleStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
