import { PlanInterval } from '@/shared/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class PlanCreateInputDto {
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
}
