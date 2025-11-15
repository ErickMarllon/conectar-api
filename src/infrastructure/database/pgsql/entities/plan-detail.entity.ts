import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PgsqlPlanM } from './plan.entity';

@Entity('plan_detail')
export class PgsqlPlanDetailM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => PgsqlPlanM, (plan) => plan.details, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'plan_id' })
  plan: PgsqlPlanM;

  @Column({ type: 'uuid' })
  plan_id: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (value?: number) => value,
      from: (value: string | null): number | null =>
        value ? parseFloat(value) : null,
    },
  })
  price?: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (value?: number) => value,
      from: (value: string | null): number | null =>
        value ? parseFloat(value) : null,
    },
  })
  discount?: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (value?: number) => value,
      from: (value: string | null): number | null =>
        value ? parseFloat(value) : null,
    },
  })
  original_price?: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  billing_period?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cta_label?: string;

  @Column({ type: 'text', array: true, nullable: true })
  included_features?: string[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
