import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CursorPaginateDto } from './cursor-paginate.dto';
import { OffsetpaginateDto } from './offset-paginate.dto';

export class PaginateMetaDto {
  @Expose()
  @ApiProperty({ type: () => OffsetpaginateDto, required: false })
  offset?: OffsetpaginateDto;

  @Expose()
  @ApiProperty({ type: () => CursorPaginateDto, required: false })
  cursor?: CursorPaginateDto;
}

export class PaginateResponseDto<T> {
  @Expose()
  @ApiProperty({ isArray: true })
  items: T[];

  @Expose()
  @ApiProperty({ type: () => PaginateMetaDto })
  meta: PaginateMetaDto;
}
