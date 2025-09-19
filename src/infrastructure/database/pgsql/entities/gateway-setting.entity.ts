import { GatewayProvider, GatewayStatus } from '@/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlTenantM } from './tenant.entity';

@Entity('gateway_setting')
export class PgsqlGatewaySettingM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PgsqlTenantM)
  tenant: PgsqlTenantM;

  @Column({ type: 'enum', enum: GatewayProvider })
  provider: GatewayProvider;

  @Column()
  api_key: string;

  @Column({ type: 'enum', enum: GatewayStatus, default: GatewayStatus.ACTIVE })
  status: GatewayStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
