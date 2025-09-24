import { AddressDto } from '@/infrastructure/http/dtos/address/address-response.dto';
import { TenantStatus } from '@/shared/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { SocialProvidersDto } from '../../user/dto/social-providers.dto';

export class PathTenantInputDto {
  @Expose()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  slug?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  whatsapp?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone_number?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  about?: string;

  @Expose()
  @ApiPropertyOptional({ enum: TenantStatus })
  @IsOptional()
  @IsEnum(TenantStatus)
  status?: TenantStatus;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ obj }) => {
    const { enable_service_schedule } = obj;
    if (enable_service_schedule === 'true' || enable_service_schedule === true)
      return true;
    if (
      enable_service_schedule === 'false' ||
      enable_service_schedule === false
    )
      return false;
    return enable_service_schedule;
  })
  @IsBoolean()
  enable_service_schedule?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ obj }) => {
    const { enable_google_calendar } = obj;
    if (enable_google_calendar === 'true' || enable_google_calendar === true)
      return true;
    if (enable_google_calendar === 'false' || enable_google_calendar === false)
      return false;
    return enable_google_calendar;
  })
  @IsBoolean()
  enable_google_calendar?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ obj }) => {
    const { is_public } = obj;
    if (is_public === 'true' || is_public === true) return true;
    if (is_public === 'false' || is_public === false) return false;
    return is_public;
  })
  @IsBoolean()
  is_public?: boolean;

  @Expose()
  @ApiPropertyOptional({ type: () => SocialProvidersDto })
  @IsOptional()
  @Type(() => SocialProvidersDto)
  social_links?: SocialProvidersDto;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => AddressDto)
  addresses?: AddressDto[];
}
