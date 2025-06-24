import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PageOptionsDto } from './page-options.dto';

export class OffsetPaginationDto {
  @ApiProperty()
  @Expose()
  readonly limit: number;

  @ApiProperty()
  @Expose()
  readonly currentPage: number;

  @ApiProperty()
  @Expose()
  readonly nextPage?: number;

  @ApiProperty()
  @Expose()
  readonly previousPage?: number;

  @ApiProperty()
  @Expose()
  readonly totalRecords: number;

  @ApiProperty()
  @Expose()
  readonly totalPages: number;

  constructor(totalRecords: number, pageOptions: PageOptionsDto) {
    const limit = pageOptions.limit;
    const currentPage = pageOptions.page;
    const totalPages = limit > 0 ? Math.ceil(totalRecords / limit) : 0;

    this.limit = limit;
    this.currentPage = currentPage;
    this.totalRecords = totalRecords;
    this.totalPages = totalPages;

    const isValidPage = currentPage > 0 && currentPage <= totalPages;

    this.nextPage =
      isValidPage && currentPage < totalPages ? currentPage + 1 : undefined;

    this.previousPage =
      isValidPage && currentPage > 1 ? currentPage - 1 : undefined;
  }
}
