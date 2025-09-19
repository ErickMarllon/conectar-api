import {
  DeliveryMethod,
  PaymentMethod,
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
import { PgsqlOrderItemM } from './order-item.entity';
import { PgsqlTenantM } from './tenant.entity';
import { PgsqlUserM } from './user.entity';

@Entity('order')
export class PgsqlOrderM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PgsqlTenantM)
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @Column()
  tenant_id: string;

  @ManyToOne(() => PgsqlUserM)
  @JoinColumn({ name: 'user_id' })
  user: PgsqlUserM;

  @Column()
  user_id: string;

  @Column()
  type: string;

  @Column({ type: 'decimal' })
  total_price: number;

  @Column({ type: 'enum', enum: ValueType, nullable: true })
  discount_type: ValueType;

  @Column({ type: 'decimal', nullable: true })
  discount_value: number;

  @Column({ type: 'enum', enum: PaymentMethod })
  PaymentMethod: PaymentMethod;

  @Column({ type: 'enum', enum: DeliveryMethod })
  DeliveryMethod: DeliveryMethod;

  @Column({ type: 'enum', enum: ServiceScheduleStatus })
  status: ServiceScheduleStatus;

  @OneToMany(() => PgsqlOrderItemM, (item) => item.order)
  items: PgsqlOrderItemM[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
