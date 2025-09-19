import { Payload } from '../../auth/jwt';
import { IUserRepository } from './user.repository.interface';

export type IUserAuthRepository = IUserRepository;

export type SigninInput = {
  email: string;
  password: string;
  tenant: string;
  ip_address?: string;
  user_agent?: string;
};

export type SignupInput = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  tenant?: string;
  plan?: string;
  ip_address?: string;
  user_agent?: string;
};

export type RefreshTokenInput = {
  refresh_token: string;
};
export type SignOutInput = Partial<Payload['sub']>;
