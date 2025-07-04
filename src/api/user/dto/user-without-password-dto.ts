import { UserDto } from '@/api/user/dto/user.dto ';
import { OmitType } from '@nestjs/swagger';

export class UserWithoutPasswordDto extends OmitType(UserDto, ['password']) {}
