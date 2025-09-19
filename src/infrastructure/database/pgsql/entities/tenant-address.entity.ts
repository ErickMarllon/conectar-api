import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlTenantM } from './tenant.entity';

@Entity('tenant_address')
export class PgsqlTenantAddressM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PgsqlTenantM, (tenant) => tenant.addresses)
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @Column()
  zip_code: string;

  @Column()
  street: string;

  @Column()
  street_number: string;

  @Column({ nullable: true })
  complement?: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ default: true })
  is_default: boolean;

  @Column()
  country: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
