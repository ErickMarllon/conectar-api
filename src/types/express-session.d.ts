import { Payload } from '@/domain/contracts/auth/jwt';
import 'express';
import 'express-session';
declare module 'express-session' {
  interface SessionData {
    state?: string;
    redirectUrl?: string;
    tenant?: string;
  }
}
declare module 'express' {
  interface Request {
    user?: Payload['sub'];
  }
}
