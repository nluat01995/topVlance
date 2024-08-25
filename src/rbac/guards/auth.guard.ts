import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY, ROLES_KEY } from '../roles.decorator';
import * as _ from 'lodash';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return super.canActivate(context);
        }
        // const request = context.switchToHttp().getRequest();
        // const user = _.get(request, 'user', {});
        // console.log(user);
        // console.log(requiredRoles);


        // const hasRole = requiredRoles.some((role) => _.get(user, 'role', []).includes(role));
        // console.log(hasRole);

        // if (!hasRole) {
        //     return false;  // Có thể return false trực tiếp để ngăn việc gọi lại super.canActivate.
        // }

        return super.canActivate(context);
    }
}
