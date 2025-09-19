import { SetMetadata } from '@nestjs/common';

export const IS_ROLE_KEY = 'isRole';
export const Roles = (...roles: string[]) => SetMetadata(IS_ROLE_KEY, roles);
