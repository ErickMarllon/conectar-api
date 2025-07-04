import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto ';

export class CreateUserDto extends PickType(UserDto, [
  'email',
  'password',
  'first_name',
  'last_name',
  'role',
]) {}
