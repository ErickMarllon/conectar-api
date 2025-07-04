import { PickType } from '@nestjs/swagger';
import { SessionDto } from './session.dto';

export class OAuthDTO extends PickType(SessionDto, [
  'source_id',
  'source',
  'access_token',
  'refresh_token',
  'expires',
]) {}
