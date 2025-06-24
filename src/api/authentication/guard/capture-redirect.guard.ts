import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CaptureRedirectGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    let redirectUrl = <string>request.query.redirect;

    if (!redirectUrl) {
      redirectUrl = '/';
    }
    request.session.redirectUrl = redirectUrl;

    return true;
  }
}
