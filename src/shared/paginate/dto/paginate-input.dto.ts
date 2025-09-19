import { SortOptionDto } from '@/shared/dto/sort-option.dto';
import { Order, PaginateMode } from '@/shared/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class paginateInputDto {
  @Expose()
  @ApiProperty({ required: false, enum: PaginateMode })
  @IsOptional()
  @IsEnum(PaginateMode)
  'rest-mode': PaginateMode;

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value))
  'rest-offset'?: number;

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  'rest-cursor'?: string;

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value))
  'rest-limit'?: number;

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(Order)
  'rest-order'?: Order;

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  'rest-sortby'?: string;

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value ? JSON.parse(value) : [],
  )
  @Type(() => SortOptionDto)
  'rest-sort'?: SortOptionDto[];
}
