import { IS_PUBLIC_KEY } from '@/shared/constants/app.constant';
import { AuthProvider } from '@/shared/enums/app.enum';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthProvider.JWT) {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const isRefreshUrl = request.url.includes('refresh');

    if (isRefreshUrl) {
      return true;
    }

    return (await super.canActivate(context)) as boolean;
  }
}
