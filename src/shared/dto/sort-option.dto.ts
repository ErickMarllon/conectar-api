import { IsEnum, IsString } from 'class-validator';
import { Order } from '../enums/order.enum';

export class SortOptionDto {
  @IsString()
  property: string;

  @IsEnum(Order)
  order: Order;
}
