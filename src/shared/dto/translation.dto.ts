import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { SupportedLangs } from '../enums/lang.enum';

export class TranslationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.CN]?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.DE]?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.EN]?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.ES]?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.FR]?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.IT]?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.JP]?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.KO]?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.PT_BR]?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.PT_PT]?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.RU]?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  [SupportedLangs.VN]?: string;
}
