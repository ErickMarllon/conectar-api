import { IS_ROLE_KEY } from '@/infrastructure/http/decorators/role.decorator';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.getRequiredRoles(context);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    return this.validateUserRoles(requiredRoles, user);
  }

  private getRequiredRoles(context: ExecutionContext): string[] {
    return this.reflector.getAllAndOverride<string[]>(IS_ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private validateUserRoles(requiredRoles: string[], user?: any): boolean {
    if (!user?.role) {
      throw new UnauthorizedException('User role not defined');
    }

    if (!requiredRoles.includes(user.role as string)) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return true;
  }
}
