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
import { PgsqlProductM } from './product.entity';
import { PgsqlServiceM } from './service.entity';
import { PgsqlTenantM } from './tenant.entity';

@Entity('category')
export class PgsqlCategoryM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;
  @ManyToOne(() => PgsqlTenantM, (tenant) => tenant.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @OneToMany(() => PgsqlProductM, (product) => product.category)
  products: PgsqlProductM[];

  @OneToMany(() => PgsqlServiceM, (service) => service.category)
  services: PgsqlServiceM[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
