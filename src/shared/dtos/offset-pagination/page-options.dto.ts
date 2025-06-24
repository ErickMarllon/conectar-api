import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
} from '@/shared/constants/app.constant';
import { Order } from '@/shared/enums/app.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export class PageOptionsDto {
  @ApiPropertyOptional({
    type: Number,
    description: 'Number of items per page',
    default: DEFAULT_PAGE_LIMIT,
    example: DEFAULT_PAGE_LIMIT,
  })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'The limit must be at least 1' })
  @Type(() => Number)
  readonly limit: number = DEFAULT_PAGE_LIMIT;

  @ApiPropertyOptional({
    type: Number,
    description: 'Current page number',
    default: DEFAULT_PAGE,
    example: DEFAULT_PAGE,
  })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'The page must be at least 1' })
  @Type(() => Number)
  readonly page: number = DEFAULT_PAGE;

  @ApiPropertyOptional({
    enum: Order,
    description: `Sorting order (${Object.values(Order).join(', ')})`,
    example: Order.ASC,
    default: Order.ASC,
  })
  @IsOptional()
  @IsEnum(Order, {
    message: `The order must be one of: ${Object.values(Order).join(', ')}`,
  })
  @Transform(({ value }) => (value ? value.toUpperCase() : undefined))
  readonly order?: Order;

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
