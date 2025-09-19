import {
  PgsqlLogMLoggableTypeEnum,
  PgsqlLogMOperationTypesEnum,
} from '@/domain/contracts/pgsql/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('logs')
export class PgsqlLog {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  loggable_type: PgsqlLogMLoggableTypeEnum;
  @Column()
  loggable_id: number;
  @Column()
  operation: PgsqlLogMOperationTypesEnum;
  @Column({ type: 'json' })
  data: object;
  @Column()
  user_id: number;
  @CreateDateColumn()
  created_at?: Date;
}
