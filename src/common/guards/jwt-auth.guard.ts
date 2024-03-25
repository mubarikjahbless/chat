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
  constructor(
    private reflector: Reflector, // @InjectModel(Auth.name) private authModel: Model<Auth>,
  ) {}

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

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('User un authenticated');
    }

    const split = authorization && authorization.split(' '); //-> Authorization: Bearer vvv

    if (!split || split.length !== 2) {
      throw new UnauthorizedException('User unauthenticated');
    }

    const token = split[1];
    if (!token) {
      throw new UnauthorizedException('User unauthenticated');
    }

    let payload: any;

    try {
      payload = await verifyJwtToken(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('User un authenticated');
    }

    // if (user.status === UserStatus.BANNED) {
    //   throw new UnauthorizedException('You account is banned contact support');
    // }

    return true;
  }
}
