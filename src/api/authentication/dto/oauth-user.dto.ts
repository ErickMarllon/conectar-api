import { UserDto } from '@/api/user/dto/user.dto ';
import { PickType } from '@nestjs/swagger';

export class OAuthUserDTO extends PickType(UserDto, [
  'email',
  'first_name',
  'last_name',
  'picture',
]) {}
