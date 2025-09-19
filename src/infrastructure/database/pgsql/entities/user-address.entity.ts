import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlUserM } from './user.entity';

@Entity('address')
export class PgsqlAddressM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PgsqlUserM, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: PgsqlUserM;

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

  @Column()
  country: string;

  @Column({ default: true })
  is_default: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
