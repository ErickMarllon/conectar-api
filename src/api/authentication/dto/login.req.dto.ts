import { StrongPasswordField } from '@/shared/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class LoginReqDto {
  @ApiProperty({ example: 'user@email.com' })
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456aA@' })
  @StrongPasswordField()
  password: string;
}
