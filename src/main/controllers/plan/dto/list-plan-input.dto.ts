import { PlanInterval } from '@/shared/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ListPlanInputDto {
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsEnum(PlanInterval)
  @IsOptional()
  interval?: PlanInterval;

  @Expose()
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  max_users?: number;

  @Expose()
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  max_products?: number;

  @Expose()
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  max_services?: number;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  created_at?: Date;

  @Expose()
  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updated_at?: Date;
}
