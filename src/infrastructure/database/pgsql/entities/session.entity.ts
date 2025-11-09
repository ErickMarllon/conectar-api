import { SessionSource } from '@/shared/enums';
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
import { PgsqlUserM } from './user.entity';

@Entity('session')
export class PgsqlSessionM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  user_id: string;

  @Column({ name: 'tenant_id' })
  tenant_id: string;

  @ManyToOne(() => PgsqlUserM, (user) => user.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: PgsqlUserM;

  @ManyToOne(() => PgsqlTenantM, (tenant) => tenant.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @Column({ type: 'enum', enum: SessionSource, default: SessionSource.JWT })
  source: SessionSource;

  @Column({ nullable: true })
  source_id: string;

  @Column({ nullable: true })
  access_token?: string;

  @Column({ nullable: true })
  refresh_token?: string;

  @Column({ nullable: true })
  ip_address: string;

  @Column({ nullable: true })
  user_agent: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
