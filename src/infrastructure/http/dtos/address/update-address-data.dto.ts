import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @ApiPropertyOptional({ description: 'ID do endereço (caso já exista)' })
  @IsOptional()
  @IsString()
  @Expose()
  id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  zip_code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  street?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  street_number?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  neighborhood?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  complement?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  country?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ obj }) => {
    const { is_default } = obj;
    return is_default === 'true' || is_default === true;
  })
  @IsBoolean()
  is_default?: boolean;
}
