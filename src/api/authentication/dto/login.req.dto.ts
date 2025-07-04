import { UserDto } from '@/api/user/dto/user.dto ';
import { PickType } from '@nestjs/swagger';

export class LoginReqDto extends PickType(UserDto, ['email', 'password']) {}
