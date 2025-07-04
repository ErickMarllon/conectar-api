import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate } from 'class-validator';

@Exclude()
export abstract class AbstractEntityDto {
  @Expose()
  @ApiProperty({
    description: 'Date and time the user was created',
    type: String,
    format: 'timestamp',
  })
  @Type(() => Date)
  @IsDate()
  created_at: Date;

  @Expose()
  @ApiProperty({
    description: 'Date and time the user was last updated',
    type: String,
    format: 'timestamp',
  })
  @Type(() => Date)
  @IsDate()
  updated_at: Date;
}
