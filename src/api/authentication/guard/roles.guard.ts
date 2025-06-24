import { ROLES_KEY } from '@/shared/constants/app.constant';
import {
  CanActivate,
  ExecutionContext,
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

    this.validateUserRoles(user, requiredRoles);
    return true;
  }

  private getRequiredRoles(context: ExecutionContext): string[] {
    return this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private validateUserRoles(user: any, requiredRoles: string[]): void {
    if (!user?.role) {
      throw new UnauthorizedException('User role not defined');
    }

    if (!requiredRoles.includes(user.role as string)) {
      throw new UnauthorizedException('Insufficient permissions');
    }
  }
}
