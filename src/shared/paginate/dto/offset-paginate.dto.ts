import { ApiProperty } from '@nestjs/swagger';
import { PaginateOptions } from '../types';

export class OffsetpaginateDto {
  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly currentPage: number;

  @ApiProperty()
  readonly nextPage?: number;

  @ApiProperty()
  readonly previousPage?: number;

  @ApiProperty()
  readonly totalRecords: number;

  @ApiProperty()
  readonly totalPages: number;

  constructor(totalRecords: number, pageOptions: PaginateOptions) {
    const limit = pageOptions.limit ?? totalRecords;
    const currentPage = pageOptions.offset ?? 1;
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
