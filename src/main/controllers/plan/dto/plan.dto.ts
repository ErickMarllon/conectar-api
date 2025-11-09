import { PlanInterval } from '@/shared/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export class PlanDto {
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
}
