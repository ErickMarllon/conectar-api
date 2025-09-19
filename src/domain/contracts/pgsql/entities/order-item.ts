import { PgsqlOrder } from './order';

export class PgsqlOrderItem {
  id: string;
  order: PgsqlOrder;
  order_id: string;
  product_id: string;
  service_id: string;
  quantity: number;
  price: number;

  constructor(input: PgsqlOrderItem) {
    Object.assign(this, input);
  }
}
