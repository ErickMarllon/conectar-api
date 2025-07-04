import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { StrongPasswordField } from '../decorators/field.decorators';
import { UserRole } from '../enums/app.enum';
import { AbstractEntityDto } from './abstract.dto';

@Exclude()
export class UserDto extends AbstractEntityDto {
  @Expose()
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'John' })
  first_name: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: '123456aA@' })
  @StrongPasswordField()
  password: string;

  @Expose()
  @IsOptional()
  @IsEnum(UserRole)
  @ApiProperty({ example: UserRole.USER })
  role?: UserRole;

  @Expose()
  @IsString()
  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'URL of the user profile picture',
  })
  picture: string;

  @Expose()
  @IsDate()
  @ApiProperty({ example: new Date(), description: 'Date of last login' })
  last_login_at?: Date;

  @Expose()
  @IsOptional()
  @IsDate()
  @ApiProperty({ example: new Date(), description: 'Date of soft delete' })
  deleted_at?: Date;
}
