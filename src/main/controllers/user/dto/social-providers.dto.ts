import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class SocialProvidersDto {
  @IsOptional()
  @IsString()
  @Expose()
  provider_facebook?: string;

  @IsOptional()
  @IsString()
  @Expose()
  provider_instagram?: string;

  @IsOptional()
  @IsString()
  @Expose()
  provider_linkedin?: string;

  @IsOptional()
  @IsString()
  @Expose()
  provider_twitter?: string;
}
