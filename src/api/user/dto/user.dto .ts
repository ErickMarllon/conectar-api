import { StrongPasswordField } from '@/shared/decorators/field.decorators';
import { AbstractEntityDto } from '@/shared/dtos/abstract.dto';
import { UserRole } from '@/shared/enums/app.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@Exclude()
export class UserDto extends AbstractEntityDto {
  @Expose()
  @ApiProperty({
    description: 'Unique identifier of the user',
    type: String,
    format: 'uuid',
  })
  @IsUUID()
  id: string;

  @Expose()
  @ApiProperty({ description: 'First name of the user' })
  @IsString()
  first_name: string;

  @Expose()
  @ApiPropertyOptional({ description: 'Last name of the user' })
  @IsString()
  last_name: string;

  @Expose()
  @ApiProperty({ description: 'Email address of the user', format: 'email' })
  @IsEmail()
  email: string;

  @Exclude()
  @ApiProperty({ example: '123456aA@' })
  @StrongPasswordField()
  password: string;

  @Expose()
  @IsOptional()
  @IsEnum(UserRole)
  @ApiProperty({ example: UserRole.USER })
  role?: UserRole;

  @Expose()
  @ApiPropertyOptional({ description: 'Profile picture URL' })
  @IsString()
  @IsOptional()
  picture: string;

  @Expose()
  @ApiPropertyOptional({ description: 'Country code for phone number' })
  @IsString()
  @IsOptional()
  country_code?: string;

  @Expose()
  @ApiPropertyOptional({ description: 'Area code for phone number' })
  @IsString()
  @IsOptional()
  area_code?: string;

  @Expose()
  @ApiPropertyOptional({ description: 'Phone number' })
  @IsString()
  @IsOptional()
  phone?: string;

  @Expose()
  @ApiPropertyOptional({ description: 'WhatsApp contact number' })
  @IsString()
  @IsOptional()
  whatsapp?: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'CPF (Brazilian individual taxpayer registry identification)',
  })
  @IsString()
  @IsOptional()
  cpf?: string;

  @Expose()
  @ApiProperty({
    description: 'Date and time of last login',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  last_login_at?: Date;

  @Expose()
  @ApiProperty({ description: 'Indicates if the user is blocked' })
  @IsBoolean()
  @IsOptional()
  is_blocked?: boolean;
}
