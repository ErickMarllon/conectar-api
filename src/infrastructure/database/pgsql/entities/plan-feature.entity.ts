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

@Entity('plan_feature')
export class PgsqlPlanFeatureM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PgsqlPlanM, (plan) => plan.features, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'plan_id' }) // FK aqui
  plan: PgsqlPlanM;

  @Column({ type: 'uuid' })
  plan_id: string;

  @Column({ type: 'varchar', length: 255 })
  feature_text: string;

  @Column({ type: 'boolean', default: false })
  is_available: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
