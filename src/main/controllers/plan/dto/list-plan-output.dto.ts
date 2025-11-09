import { PlanInterval } from '@/shared/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PlanDetailDto } from './plan-detail.dto';
import { PlanFeatureDto } from './plan-feature.dto';

export class ListPlanOutputDto {
  @Expose()
  @ApiProperty()
  @IsString()
  id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  tier: string;

  @Expose()
  @ApiProperty()
  @IsEnum(PlanInterval)
  interval: PlanInterval;

  @Expose()
  @ApiProperty()
  @IsNumber()
  max_users: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  max_products: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  max_services: number;

  @Expose()
  @ApiProperty()
  @IsString()
  description: string;

  @Expose()
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @Expose()
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  @Expose()
  @ApiPropertyOptional({ type: PlanDetailDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PlanDetailDto)
  details?: PlanDetailDto;

  @Expose()
  @ApiPropertyOptional({ type: [PlanFeatureDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PlanFeatureDto)
  features?: PlanFeatureDto[];
}
