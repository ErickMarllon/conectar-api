import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants/app.constant';
import { UserRole } from '../enums/app.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
