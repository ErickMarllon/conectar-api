import { OAuthUserDTO } from '@/api/authentication/dto/oauth-user.dto';
import { OmitType, PartialType } from '@nestjs/swagger';
import { UserDto } from './user.dto ';

export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['created_at', 'updated_at']),
) {}
export class UpdateUserOauthDto extends OAuthUserDTO {
  password?: string;
}
