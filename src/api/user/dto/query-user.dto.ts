import { PageOptionsDto } from '@/shared/dtos/offset-pagination/page-options.dto';
import { SortBy, UserRole } from '@/shared/enums/app.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class QueryUserDto extends PageOptionsDto {
  @ApiPropertyOptional({ enum: SortBy })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.CREATED_AT;

  @ApiPropertyOptional({
    type: String,
    description: 'Search query',
    example: 'teste',
  })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;
}
