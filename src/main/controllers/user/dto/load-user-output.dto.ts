import { AddressDto } from '@/infrastructure/http/dtos/address/address-response.dto';
import { UserStatus } from '@/shared/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { SocialProvidersDto } from './social-providers.dto';

export class LoadUserOutputDto {
  @Expose()
  @ApiProperty()
  @IsString()
  id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  first_name: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  last_name?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  about?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone_number?: string | null;

  @Expose()
  @ApiProperty()
  @IsEmail()
  email: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar_url?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cpf?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @Expose()
  @ApiProperty()
  @IsString()
  role: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenant?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Expose()
  is_verified: boolean;

  @Expose()
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  last_login_at: Date;

  @Expose()
  @ApiPropertyOptional({ type: AddressDto })
  @Type(() => AddressDto)
  addresses: AddressDto[];

  @Expose()
  @ApiPropertyOptional({ type: () => SocialProvidersDto })
  @Type(() => SocialProvidersDto)
  social_links: SocialProvidersDto;

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
