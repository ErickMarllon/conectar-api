import { ValueType } from '@/shared/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PgsqlCategoryM } from './category.entity';
import { PgsqlMediaM } from './media.entity';
import { PgsqlProductReviewM } from './product-review.entity';
import { PgsqlTenantM } from './tenant.entity';

@Entity('product')
export class PgsqlProductM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'citext' })
  name: string;

  @Column({ type: 'citext' })
  sku: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  sold_quantity: number;

  @Column({
    type: 'enum',
    enum: ValueType,
    nullable: true,
    default: ValueType.FIXED,
  })
  discount_type: ValueType;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount_value: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  final_price: number;

  @Column({ type: 'int', default: 0 })
  reserved_quantity: number;

  @Column({ type: 'int', default: 0 })
  available: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  total_rating: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  total_review: number;

  @Column({ nullable: true })
  gender: string;

  @ManyToOne(() => PgsqlCategoryM, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: PgsqlCategoryM;

  @ManyToOne(() => PgsqlTenantM, (tenant) => tenant.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: PgsqlTenantM;

  @OneToMany(() => PgsqlMediaM, (media) => media.product)
  images: PgsqlMediaM[];

  @OneToMany(() => PgsqlProductReviewM, (review) => review.product, {
    cascade: true,
  })
  reviews: PgsqlProductReviewM[];

  // @ManyToMany(() => PgsqlProductTag, (tag) => tag.product, { cascade: true })
  // @JoinTable()
  // tags: PgsqlProductTag[];

  // @ManyToMany(() => PgsqlProductColor, (color) => color.product, {
  //   cascade: true,
  // })
  // @JoinTable()
  // colors: PgsqlProductColor[];

  // @ManyToMany(() => PgsqlProductSize, (size) => size.product, { cascade: true })
  // @JoinTable()
  // sizes: PgsqlProductSize[];

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updated_at: Date;
}
