import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PlanDetailDto {
  @Expose()
  @ApiProperty()
  @IsString()
  id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  plan_id: string;

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  original_price?: number;

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  billing_period?: string;

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cta_label?: string;

  @Expose()
  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  included_features?: string[];
}
