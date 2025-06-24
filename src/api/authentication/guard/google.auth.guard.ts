import { AuthProvider } from '@/shared/enums/app.enum';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GoogleAuthGuard extends AuthGuard(AuthProvider.GOOGLE) {
  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const state = <string>req.session.state;

    return {
      state,
    };
  }
}
