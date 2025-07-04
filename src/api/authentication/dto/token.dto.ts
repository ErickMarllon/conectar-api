import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SessionDto } from './session.dto';

export class TokenReqDto extends PickType(SessionDto, ['refresh_token']) {
  @ApiProperty({
    example: 'dGhpc2lzYXJlZnJlc2h0b2tlbg==',
    description: 'Refresh token',
  })
  @IsString()
  refresh_token: string;
}
