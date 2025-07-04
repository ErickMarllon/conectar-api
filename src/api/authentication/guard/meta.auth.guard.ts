import { UserDto } from '@/shared/dtos/user.dto ';
import { AuthProvider } from '@/shared/enums/app.enum';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class MetaAuthGuard extends AuthGuard(AuthProvider.META) {
  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const state = <string>req.session.state;

    return { state };
  }

  handleRequest(err: any, user: UserDto) {
    if (err || !user) {
      return null as any;
    }
    return user;
  }
}
