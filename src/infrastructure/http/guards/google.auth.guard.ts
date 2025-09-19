import { SessionSource } from '@/shared/enums';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GoogleAuthGuard extends AuthGuard(SessionSource.GOOGLE) {
  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const state = <string>req.session.state;

    return { state };
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      return null as any;
    }
    return user;
  }
}
