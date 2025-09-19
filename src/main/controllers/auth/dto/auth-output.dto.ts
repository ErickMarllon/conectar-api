import { UserStatus } from '@/shared/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class AuthOutputDto {
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
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar_url?: string | null;

  @Expose()
  @ApiPropertyOptional({ enum: UserStatus, example: UserStatus.PENDING })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @Expose()
  @ApiProperty()
  @IsString()
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
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  is_verified: boolean;
}
