import { AccessTypes } from '@/shared/enums/app.enum';

export interface IJwtPayload {
  sub: {
    id: string;
    email: string;
    role: string;
    type: AccessTypes;
  };
}
