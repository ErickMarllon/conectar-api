import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { AbstractEntityDto } from './abstract.dto';

@Exclude()
export class SessionDto extends AbstractEntityDto {
  @Expose()
  @IsUUID()
  @ApiProperty({ example: 'c56a4180-65aa-42ec-a945-5fd21dec0538' })
  id: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'google' })
  source: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'user123' })
  source_id: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'dGhpc2lzYXJlZnJlc2h0b2tlbg==', nullable: true })
  refresh_token?: string | null;

  @Expose()
  @IsOptional()
  @IsDate()
  @ApiProperty({
    example: new Date(),
    nullable: true,
    description: 'Expiration date/time',
  })
  expires?: Date | null;

  @Expose()
  @IsUUID()
  @ApiProperty({ example: 'a7d0f6d4-2a6c-4b97-91e3-c8f5a3a1c3b6' })
  user_id: string;
}
