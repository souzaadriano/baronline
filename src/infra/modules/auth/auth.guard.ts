import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permission.decorator';
import { PERMISSION } from '@/core/entities/enums/permission.enum';
import { Session } from '@/core/entities/value-objects/session.object';
import { AuthService } from './auth.service';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublic(context)) return true;
    const { permissions, session, token, request } = await this.extractContext(context);
    this.checkPermissions(session, permissions);
    request['session'] = session;
    return true;
  }

  private async extractContext(context: ExecutionContext) {
    const request = this.getRequest(context);
    const permissions = this.getRoutePermissions(context);
    const token = this.getToken(request);
    const session = await this.getSession(token);
    return { permissions, token, session, request };
  }

  private isPublic(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isPublic) return false;
    return true;
  }

  private getRoutePermissions(context: ExecutionContext) {
    const requirePermissions = this.reflector.getAllAndOverride<PERMISSION[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requirePermissions) return [];
    return requirePermissions;
  }

  private getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  private async getSession(token?: string) {
    return await this.authService.retrieveSession(token);
  }

  private getToken(request: any) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private checkPermissions(session: Session, required: PERMISSION[]) {
    const haveAccess = required.some((permission) => session.hasPermission(permission));
    if (!haveAccess) throw new UnauthorizedException();
  }
}
