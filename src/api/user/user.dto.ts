import { User } from '@/database/entities/user-typeorm.entity';

export class OAuthUserDTO {
  email: string;
  first_name: string;
  last_name?: string;
  picture?: string;
}

export class findOrCreateInputDTO extends OAuthUserDTO {
  password?: string;
}
export type UserSignInDTO = Pick<User, 'email' | 'password'>;

export interface JwtPayload {
  sub: {
    id: string;
    email: string;
    role: string;
    type: 'access' | 'refresh';
  };
}
