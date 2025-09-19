import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserPasswordInputDto {
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  old_password?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  new_password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Expose()
  delete_all_sessions: boolean;
}
