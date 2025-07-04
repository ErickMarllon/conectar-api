import { UserRole } from '@/shared/enums/app.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserFilterDto {
  @Expose()
  @IsOptional()
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John' })
  first_name?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Doe' })
  last_name?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'user@email.com' })
  email?: string;

  @Expose()
  @IsOptional()
  @IsEnum(UserRole)
  @ApiProperty({ example: UserRole.USER })
  role?: UserRole;

  @Expose()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: new Date(), description: 'Start date' })
  startDate?: Date;

  @Expose()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: new Date(), description: 'End data' })
  endDate?: Date;
}
