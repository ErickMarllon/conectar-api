import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterInputDto {
  @Expose()
  @ApiProperty()
  @IsString()
  first_name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  last_name: string;

  @Expose()
  @ApiProperty()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @Expose()
  @ApiProperty()
  @IsString()
  password: string;

  @Expose()
  @ApiPropertyOptional({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  tenant?: string;

  @Expose()
  @ApiPropertyOptional({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  plan?: string;
}
