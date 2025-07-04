import { PageOptionsDto } from '@/shared/dtos/offset-pagination/page-options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryDto extends PageOptionsDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Search query for filtering results',
    example: 'teste',
    default: 'teste',
  })
  @IsOptional()
  @IsString()
  readonly searchTerm?: string;
}
