import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlUserM } from './user.entity';

@Entity('user_social')
export class PgsqlUserSocialM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => PgsqlUserM, (user) => user.social)
  @JoinColumn({ name: 'user_id' })
  user: PgsqlUserM;

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
