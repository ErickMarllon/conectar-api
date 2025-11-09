import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class PlanFeatureDto {
  @Expose()
  @ApiProperty()
  @IsString()
  id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  plan_id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  feature_text: string;

  @Expose()
  @ApiProperty()
  is_available: boolean;
}
