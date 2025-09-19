import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IsOptional, IsString } from 'class-validator';

export class UpdateSocialUserInputDto {
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  provider_facebook?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  provider_instagram?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  provider_linkedin?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  provider_twitter?: string;
}

export class UpdateSocialUserOutputDto extends UpdateSocialUserInputDto {}
