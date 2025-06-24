import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { User } from './user-typeorm.entity';

@Entity('session')
@Index(['source', 'source_id'], { unique: true })
export class Session extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  source: string;

  @Column('text')
  source_id: string;

  @Column('text')
  access_token: string;

  @Column({ type: 'text', nullable: true })
  refresh_token: string | null;

  @Column({ nullable: true, type: 'timestamp' })
  expires: Date | null;

  @Column()
  user_id: string;

  @OneToOne(() => User, (user) => user.session, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
