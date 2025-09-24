import { AddressDto } from '@/infrastructure/http/dtos/address/address-response.dto';
import { TenantStatus } from '@/shared/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { SocialProvidersDto } from '../../user/dto/social-providers.dto';

export class LoadTenantOutputDto {
  @Expose()
  @ApiProperty()
  @IsString()
  id: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  email?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  logo_url?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  cover_url?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  slug: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  whatsapp?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  phone_number?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  about?: string;

  @Expose()
  @ApiProperty({ enum: TenantStatus })
  @IsEnum(TenantStatus)
  status: TenantStatus;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  enable_service_schedule: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  enable_google_calendar: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  is_public: boolean;

  @Expose()
  @ApiPropertyOptional({ type: () => SocialProvidersDto })
  @Type(() => SocialProvidersDto)
  social_links: SocialProvidersDto;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => AddressDto)
  addresses?: AddressDto[];

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
