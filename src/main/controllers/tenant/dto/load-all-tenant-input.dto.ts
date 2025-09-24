import { TenantStatus } from '@/shared/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class LoadAllTenantInputDto {
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone_number?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @Expose()
  @ApiPropertyOptional({ enum: TenantStatus })
  @IsOptional()
  @IsEnum(TenantStatus)
  status?: TenantStatus;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zip_code?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  street?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  state?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country?: string;
}
