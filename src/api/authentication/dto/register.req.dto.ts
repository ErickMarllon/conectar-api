import { capitalizeWordsTransformer } from '@/utils/transformers/capitalize-word-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { LoginReqDto } from './login.req.dto';

export class RegisterReqDto extends LoginReqDto {
  @ApiProperty({ example: 'Josh' })
  @IsString()
  @Transform(capitalizeWordsTransformer)
  first_name: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @Transform(capitalizeWordsTransformer)
  last_name: string;
}
