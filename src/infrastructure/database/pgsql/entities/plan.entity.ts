import { PlanInterval } from '@/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlTenantSubscriptionM } from './tenant-subscription.entity';
import { PgsqlTenantM } from './tenant.entity';

@Entity('plan')
export class PgsqlPlanM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: PlanInterval, default: PlanInterval.MONTHLY })
  interval: PlanInterval;

  @Column()
  max_users: number;

  @Column()
  max_products: number;

  @Column()
  max_services: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => PgsqlTenantM, (tenant) => tenant.plan)
  tenants: PgsqlTenantM[];

  @OneToMany(
    () => PgsqlTenantSubscriptionM,
    (subscription) => subscription.plan,
  )
  subscriptions: PgsqlTenantSubscriptionM[];
}
