import { UserDto } from '@/api/user/dto/user.dto ';
import { PickType } from '@nestjs/swagger';

export class RegisterReqDto extends PickType(UserDto, [
  'email',
  'password',
  'first_name',
  'last_name',
]) {}
