import { UserDto } from '@/shared/dtos/user.dto ';
import { PickType } from '@nestjs/swagger';

export class LoginReqDto extends PickType(UserDto, ['email', 'password']) {}
