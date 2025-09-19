import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlNotificationEventM } from './notification-event.entity';

@Entity('event_type')
export class PgsqlEventTypeM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => PgsqlNotificationEventM, (event) => event.eventType)
  notificationEvents: PgsqlNotificationEventM[];
}
