import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class SigninInputDto {
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
  @ApiProperty()
  @IsString()
  tenant: string;
}
