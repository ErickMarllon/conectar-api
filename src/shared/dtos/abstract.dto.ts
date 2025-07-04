import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate } from 'class-validator';

@Exclude()
export abstract class AbstractEntityDto {
  @Expose()
  @IsDate()
  @ApiProperty({
    example: new Date(),
    description: 'Creation timestamp',
  })
  created_at: Date;

  @Expose()
  @IsDate()
  @ApiProperty({
    example: new Date(),
    description: 'Last update timestamp',
  })
  updated_at: Date;
}
