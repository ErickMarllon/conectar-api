import { PgsqlProduct } from './product';
import { PgsqlUser } from './user';

export class PgsqlProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  product: PgsqlProduct;
  user: PgsqlUser;

  constructor(input: PgsqlProductReview) {
    Object.assign(this, input);
  }
}
