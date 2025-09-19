import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlTenantM } from './tenant.entity';

@Entity('tenant_social')
export class PgsqlTenantSocialM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => PgsqlTenantM, (tenant) => tenant.social)
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @Column({ nullable: true })
  provider_facebook: string;

  @Column({ nullable: true })
  provider_instagram: string;

  @Column({ nullable: true })
  provider_linkedin: string;

  @Column({ nullable: true })
  provider_twitter: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
