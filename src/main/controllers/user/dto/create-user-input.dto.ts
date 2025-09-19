import { UpdateAddressDto } from '@/infrastructure/http/dtos/address/update-address-data.dto';
import { UserStatus } from '@/shared/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserInputDto {
  @Expose()
  @ApiProperty()
  @IsString()
  first_name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  last_name: string;

  @Expose()
  @ApiPropertyOptional({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  tenant?: string;

  @Expose()
  @ApiPropertyOptional({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  phone_number?: string | null;

  @Expose()
  @ApiProperty()
  @IsEmail()
  email: string;

  @Expose()
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Avatar image file',
    required: false,
  })
  @IsOptional()
  avatar?: Express.Multer.File;

  @Expose()
  @ApiPropertyOptional({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  cpf?: string | null;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @Expose()
  @ApiProperty()
  @IsString()
  @Transform(({ obj }) => obj.role?.name ?? obj.role)
  role: string;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  is_verified: boolean;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;
}
