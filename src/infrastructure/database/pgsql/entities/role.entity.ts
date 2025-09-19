import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlUserM } from './user.entity';

@Entity('role')
export class PgsqlRoleM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'citext',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({ length: 50, nullable: true })
  description: string;

  @OneToMany(() => PgsqlUserM, (user) => user.role)
  users: PgsqlUserM[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
