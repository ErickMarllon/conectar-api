import { CurrentUserDto } from '@/main/controllers/user/dto';
import { SessionSource } from '@/shared/enums';
import { IUserRepository } from './user.repository.interface';

export type IUserOAuthRepository = IUserRepository;

export type OAuthSession = {
  source_id: string;
  source: SessionSource;
  access_token?: string;
  refresh_token?: string;
  expires_token?: string | Date | null;
};

export type OAuthUser = {
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
};

export type SigninOauth = {
  sessionOptions: OAuthSession;
  userOptions: OAuthUser;
  tenant?: string;
};

export type ProcessOauthInput = {
  user: CurrentUserDto;
  redirectUrl?: string;
  tenant?: string;
};
