import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgsqlProductM } from './product.entity';
import { PgsqlServiceM } from './service.entity';

@Entity('media')
export class PgsqlMediaM {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  original_file_name: string;
  @Column()
  path: string;
  @Column()
  is_main: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => PgsqlProductM, (product) => product.images, {
    nullable: true,
  })
  product?: PgsqlProductM | null;

  @ManyToOne(() => PgsqlServiceM, (service) => service.images, {
    nullable: true,
  })
  service?: PgsqlServiceM;
}
