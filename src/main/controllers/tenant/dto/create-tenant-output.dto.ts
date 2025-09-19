import { TenantStatus } from '@/shared/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTenantOutputDto {
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
  @ApiProperty()
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty({ enum: TenantStatus, example: TenantStatus.ACTIVE })
  @IsOptional()
  @IsEnum(TenantStatus)
  status?: TenantStatus;

  @Expose()
  @ApiProperty()
  @IsString()
  role: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  tenant_name: string;

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
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  is_verified: boolean;
}
