import { PlanInterval } from '@/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlPlanDetailM } from './plan-detail.entity';
import { PgsqlPlanFeatureM } from './plan-feature.entity';
import { PgsqlTenantM } from './tenant.entity';

@Entity('plan')
export class PgsqlPlanM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  tier: string;

  @Column()
  max_users: number;

  @Column()
  max_products: number;

  @Column()
  max_services: number;

  @Column({ type: 'enum', enum: PlanInterval, default: PlanInterval.MONTHLY })
  interval: PlanInterval;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => PgsqlTenantM, (tenant) => tenant.plan)
  tenants: PgsqlTenantM[];

  @OneToOne(() => PgsqlPlanDetailM, (detail) => detail.plan)
  details: PgsqlPlanDetailM;

  @OneToMany(() => PgsqlPlanFeatureM, (feature) => feature.plan)
  features: PgsqlPlanFeatureM[];

  // @OneToMany(
  //   () => PgsqlTenantSubscriptionM,
  //   (subscription) => subscription.plan,
  // )
  // subscriptions: PgsqlTenantSubscriptionM[];
}
