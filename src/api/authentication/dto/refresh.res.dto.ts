import { PickType } from '@nestjs/swagger';
import { SessionDto } from './session.dto';

export class RefreshResDto extends PickType(SessionDto, [
  'access_token',
  'refresh_token',
  'expires',
]) {}
