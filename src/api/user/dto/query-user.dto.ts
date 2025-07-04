import { PageOptionsDto } from '@/shared/dtos/offset-pagination/page-options.dto';
import { SortBy, UserRole } from '@/shared/enums/app.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class QueryUserDto extends PageOptionsDto {
  @ApiPropertyOptional({ enum: SortBy, description: 'Field to sort by' })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.CREATED_AT;

  @ApiPropertyOptional({ description: 'Search term (name, email, etc.)' })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @ApiPropertyOptional({ type: String, description: 'User ID' })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiPropertyOptional({ description: 'First name of the user' })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiPropertyOptional({ description: 'Last name of the user' })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({ description: 'Email address of the user' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ enum: UserRole, description: 'Role of the user' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ description: 'Start date for filtering (created_at)' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({ description: 'End date for filtering (created_at)' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @ApiPropertyOptional({ description: 'User phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'User WhatsApp number' })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiPropertyOptional({ description: 'User CPF (Brazilian ID)' })
  @IsOptional()
  @IsString()
  cpf?: string;
}
