import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PgsqlOrderM } from './order.entity';

@Entity('order_item')
export class PgsqlOrderItemM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PgsqlOrderM, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: PgsqlOrderM;

  @Column()
  order_id: string;

  @Column({ nullable: true })
  product_id: string;

  @Column({ nullable: true })
  service_id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal' })
  price: number;
}
