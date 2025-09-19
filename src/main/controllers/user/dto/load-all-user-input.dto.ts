import { UserStatus } from '@/shared/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class LoadAllUserInputDto {
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
  first_name?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  last_name?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cpf?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  is_verified?: boolean;

  @Expose()
  @ApiPropertyOptional({ enum: UserStatus })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country_code?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  area_code?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone_number?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  whatsapp?: string;

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
