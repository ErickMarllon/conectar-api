import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateTenantInputDto {
  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  first_name: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  last_name: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  tenant_name: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  plan: string;
}
