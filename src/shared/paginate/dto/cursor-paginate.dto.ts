import { ApiProperty } from '@nestjs/swagger';

export class CursorPaginateDto {
  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly afterCursor?: string;

  @ApiProperty()
  readonly beforeCursor?: string;

  constructor(limit: number, afterCursor?: string, beforeCursor?: string) {
    this.limit = limit;
    this.beforeCursor = beforeCursor;
    this.afterCursor = afterCursor;
  }
}
