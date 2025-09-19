import { GatewayProvider, PaymentStatus } from '@/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlInvoiceM } from './invoice.entity';
import { PgsqlTenantM } from './tenant.entity';

@Entity('payment')
export class PgsqlPaymentM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PgsqlTenantM)
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @Column()
  tenant_id: string;

  @ManyToOne(() => PgsqlInvoiceM)
  @JoinColumn({ name: 'invoice_id' })
  invoice: PgsqlInvoiceM;

  @Column()
  invoice_id: string;

  @Column({ nullable: true })
  service_schedule_id?: string;

  @Column({ type: 'enum', enum: GatewayProvider })
  gateway: GatewayProvider;

  @Column({ type: 'enum', enum: PaymentStatus })
  status: PaymentStatus;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'timestamptz', nullable: true })
  paid_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
