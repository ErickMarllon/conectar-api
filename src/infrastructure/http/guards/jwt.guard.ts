import { IS_PUBLIC_KEY } from '@/infrastructure/http/decorators/public-routes.decorator';
import { SessionSource } from '@/shared/enums';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard(SessionSource.JWT) {
  constructor(private reflector: Reflector) {
    super();
  }

  private isRoutePublicOrRefresh(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const isRefreshUrl = request.url.includes('refresh');

    return isPublic || isRefreshUrl;
  }

  canActivate(context: ExecutionContext) {
    return this.isRoutePublicOrRefresh(context) || super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (this.isRoutePublicOrRefresh(context)) {
      return true;
    }

    if (err) {
      throw new UnauthorizedException(err.message);
    }

    if (info) {
      const msgMap: Record<string, string> = {
        JsonWebTokenError: 'Invalid token',
        TokenExpiredError: 'Expired token',
        'No auth token': 'Token absent',
      };

      const message =
        msgMap[info.name] || msgMap[info.message] || 'Unauthorized';

      throw new UnauthorizedException(message);
    }

    if (!user) {
      throw new UnauthorizedException('Unauthorized user');
    }

    return user;
  }
}
