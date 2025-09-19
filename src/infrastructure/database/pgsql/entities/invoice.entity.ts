import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlOrderM } from './order.entity';
import { PgsqlTenantM } from './tenant.entity';

@Entity('invoice')
export class PgsqlInvoiceM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PgsqlTenantM)
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @Column()
  tenant_id: string;

  @ManyToOne(() => PgsqlOrderM)
  @JoinColumn({ name: 'order_id' })
  order: PgsqlOrderM;

  @Column()
  order_id: string;

  @Column()
  type: string;

  @Column({ type: 'decimal' })
  total: number;

  @Column({ type: 'decimal', nullable: true })
  total_discount: number;

  @Column({ nullable: true })
  details: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
