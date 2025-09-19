import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AddressDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  user_id: string;

  @Expose()
  @ApiProperty()
  zip_code: string;

  @Expose()
  @ApiProperty()
  street: string;

  @Expose()
  @ApiPropertyOptional()
  street_number?: string;

  @Expose()
  @ApiPropertyOptional()
  neighborhood?: string;

  @Expose()
  @ApiPropertyOptional()
  complement?: string;

  @Expose()
  @ApiProperty()
  city: string;

  @Expose()
  @ApiProperty()
  state: string;

  @Expose()
  @ApiProperty()
  country: string;

  @Expose()
  @ApiProperty()
  is_default: boolean;

  @Expose()
  @ApiProperty()
  created_at: Date;

  @Expose()
  @ApiProperty()
  updated_at: Date;
}
