import { AbstractEntityDto } from '@/shared/dtos/abstract.dto';
import { AuthProvider } from '@/shared/enums/app.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class SessionDto extends AbstractEntityDto {
  @Expose()
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'c56a4180-65aa-42ec-a945-5fd21dec0538',
    description: 'Unique identifier of the session',
  })
  @IsUUID()
  id: string;

  @Expose()
  @IsEnum(AuthProvider)
  @ApiProperty({
    example: 'google',
    description: 'The authentication provider used for the session',
  })
  source: AuthProvider;

  @Expose()
  @IsString()
  @ApiProperty({
    example: 'user123',
    description: 'Unique ID from the authentication provider',
  })
  source_id: string;

  @Expose()
  @IsString()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Access token for the session',
  })
  access_token: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    nullable: true,
    description: 'Refresh token if provided by the provider',
  })
  refresh_token?: string | null;

  @Expose()
  @IsOptional()
  @IsDate()
  @ApiProperty({
    example: new Date(),
    nullable: true,
    description: 'Date and time when the session expires',
  })
  expires?: Date | null;

  @Expose()
  @IsUUID()
  @ApiProperty({
    example: 'a7d0f6d4-2a6c-4b97-91e3-c8f5a3a1c3b6',
    description: 'User ID associated with the session',
  })
  user_id: string;
}
