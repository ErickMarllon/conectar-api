import { UpdateAddressDto } from '@/infrastructure/http/dtos/address/update-address-data.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { CurrentUserDto } from './current.user.dto';

export class PartialUserDto extends PartialType(CurrentUserDto) {}

import { UserStatus } from '@/shared/enums';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserInputDto {
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

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ obj }) => {
    const { is_verified } = obj;
    return is_verified === 'true' || is_verified === true;
  })
  @IsBoolean()
  is_verified?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;
}
