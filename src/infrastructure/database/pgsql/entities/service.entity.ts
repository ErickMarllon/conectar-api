import { DeliveryMethod, ValueType } from '@/shared/enums';
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
import { PgsqlCategoryM } from './category.entity';
import { PgsqlMediaM } from './media.entity';
import { PgsqlServiceScheduleM } from './service-schedule.entity';
import { PgsqlTenantM } from './tenant.entity';

@Entity('service')
export class PgsqlServiceM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'uuid' })
  category_id: string;

  @ManyToOne(() => PgsqlCategoryM, (category) => category.services, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: PgsqlCategoryM;

  @Column({ type: 'enum', enum: ValueType, nullable: true })
  discount_type: ValueType;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount_value: number;

  @Column({ type: 'enum', enum: DeliveryMethod })
  DeliveryMethod: DeliveryMethod;

  @Column({ type: 'uuid' })
  tenant_id: string;

  @ManyToOne(() => PgsqlTenantM, (tenant) => tenant.services, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @OneToMany(() => PgsqlMediaM, (media) => media.service)
  images: PgsqlMediaM[];

  @OneToMany(
    () => PgsqlServiceScheduleM,
    (serviceSchedule) => serviceSchedule.service,
  )
  schedules: PgsqlServiceScheduleM[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
