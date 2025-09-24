import { TenantStatus } from '@/shared/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CurrentUserDto {
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
  last_name?: string | null;

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
  avatar_url?: string | null;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cpf?: string | null;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TenantStatus)
  status?: TenantStatus;

  @Expose()
  @ApiProperty()
  @IsString()
  @Transform(({ obj }) => obj.role?.name ?? obj.role)
  role: string;

  @Expose()
  @ApiProperty()
  @IsString()
  access_token: string;

  @Expose()
  @ApiProperty()
  @IsString()
  refresh_token: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  is_verified: boolean;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  tenant: string;

  @Expose()
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  last_login_at: Date;

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
