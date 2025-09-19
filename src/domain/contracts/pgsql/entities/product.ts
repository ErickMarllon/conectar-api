import { ValueType } from '@/shared/enums';
import { PgsqlCategory } from './category';
import { PgsqlMedia } from './media';
import { PgsqlProductReview } from './product-review';
import { PgsqlTenant } from './tenant';

export class PgsqlProduct {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  sold_quantity: number;
  discount_type: ValueType;
  discount_value: number;
  final_price: number;
  reserved_quantity: number;
  available: number;
  total_rating: number;
  total_review: number;
  gender: string;
  category: PgsqlCategory;
  tenant: PgsqlTenant;
  images: PgsqlMedia[];
  reviews: PgsqlProductReview[];

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

  created_at: Date;
  updated_at: Date;

  constructor(input: PgsqlProduct) {
    Object.assign(this, input);
  }
}
