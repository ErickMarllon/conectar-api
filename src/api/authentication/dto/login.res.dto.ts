import { UserRole } from '@/shared/enums/app.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class LoginResDto {
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
  @IsString()
  @ApiProperty({
    example: UserRole.ADMIN,
  })
  role: string;

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
  @IsString()
  @ApiProperty({
    example: 'dGhpc2lzYXJlZnJlc2h0b2tlbg==',
    description: 'Refresh token to get a new access token',
  })
  refresh_token: string;

  @Expose()
  @IsNumber()
  @ApiProperty({
    example: 1718882400000,
    description: 'Access token expiration timestamp (in milliseconds)',
  })
  token_expires: number;
}
