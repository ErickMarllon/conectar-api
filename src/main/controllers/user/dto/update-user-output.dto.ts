import { UpdateAddressDto } from '@/infrastructure/http/dtos/address/update-address-data.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { UserStatus } from '@/shared/enums';
import { IsBoolean, IsEmail, IsEnum, IsOptional } from 'class-validator';
export class UserUpdateOutputDto {
  @Expose()
  @ApiProperty()
  @IsString()
  id: string;

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
  phone_number?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar_url?: string | null;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cpf?: string | null;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Expose()
  is_verified: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;
}
