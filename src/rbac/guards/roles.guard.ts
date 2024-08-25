import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles.decorator';
import { Role } from '../enums/role.enum';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    console.log('vao2222222222222222');

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // If no roles are specified, allow access
    }
    console.log(requiredRoles);

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('wwwwww', user);

    if (!user || !requiredRoles.some(role => user.role?.includes(role))) {
      throw new ForbiddenException('Access denied');
    }
    return true;
  }
}
