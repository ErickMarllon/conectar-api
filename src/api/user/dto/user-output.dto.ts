import { UserWithoutPasswordDto } from '@/shared/dtos/user-without-password-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UserOutputDto extends UserWithoutPasswordDto {
  @Expose()
  @IsString()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  access_token: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'dGhpc2lzYXJlZnJlc2h0b2tlbg==',
    description: 'Refresh token to get a new access token',
  })
  refresh_token?: string | null;

  @Expose()
  @IsOptional()
  @IsDate()
  @ApiProperty({
    example: new Date(),
    description: 'Access token expiration timestamp (in milliseconds)',
  })
  token_expires?: Date | null;
}
