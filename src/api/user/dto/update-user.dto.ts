import { UserDto } from '@/shared/dtos/user.dto ';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['id', 'created_at', 'updated_at', 'last_login_at']),
) {}
