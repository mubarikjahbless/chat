import { IS_PUBLIC_KEY } from '../decorators/public.route.decorator';
import { Reflector } from '@nestjs/core';
import { verifyJwtToken } from '../helpers/jwt.helper';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('User un authenticated');
    }

    const split = authorization.split(' ');

    if (split.length !== 2 || !split[1]) {
      throw new UnauthorizedException('User unauthenticated');
    }

    try {
      const token = split[1];
      const payload = verifyJwtToken(token);
      context.switchToHttp().getRequest().user = payload;
    } catch (error) {
      throw new UnauthorizedException('User un authenticated');
    }

    return true;
  }
}
