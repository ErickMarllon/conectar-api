import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CsrfStateGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const stateQuery = <string>request.query.state;
    const state = <string>request.session.state;

    if (!state || stateQuery !== state) {
      throw new UnauthorizedException('Invalid state');
    }

    delete request.session.state;

    return true;
  }
}
