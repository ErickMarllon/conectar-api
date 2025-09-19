import { TenantStatus } from '@/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlPlanM } from './plan.entity';
import { PgsqlTenantM } from './tenant.entity';

@Entity('tenant_subscription')
export class PgsqlTenantSubscriptionM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PgsqlTenantM, (tenant) => tenant.subscriptions)
  tenant: PgsqlTenantM;

  @ManyToOne(() => PgsqlPlanM, (plan) => plan.subscriptions, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'plan_id' })
  plan: PgsqlPlanM;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount_paid: number;

  @Column({ type: 'timestamp with time zone' })
  start_date: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  end_date: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  paid_at: Date;

  @Column({
    type: 'enum',
    enum: TenantStatus,
    default: TenantStatus.ACTIVE,
  })
  status: TenantStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
