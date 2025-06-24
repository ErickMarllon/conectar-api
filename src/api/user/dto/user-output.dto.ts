import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UserOutputDto {
  @Expose()
  @IsString()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  user_id: string;

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
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'USER' })
  role?: string;

  @Expose()
  @IsString()
  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'URL of the user profile picture',
  })
  picture: string;

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
  @IsNumber()
  @ApiProperty({
    example: 1718882400000,
    description: 'Access token expiration timestamp (in milliseconds)',
  })
  //corrigir depois
  token_expires?: number | string | null;
}
