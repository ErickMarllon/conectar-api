import { PageOptionsDto } from '@/shared/dtos/offset-pagination/page-options.dto';
import { SortBy, UserRole } from '@/shared/enums/app.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryUserDto extends PageOptionsDto {
  @ApiPropertyOptional({ enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    enum: SortBy,
  })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.CREATED_AT;

  @ApiPropertyOptional({
    type: String,
    description: 'Search query for filtering results',
    example: 'teste',
    default: 'teste',
  })
  @IsOptional()
  @IsString()
  readonly search?: string;
}
