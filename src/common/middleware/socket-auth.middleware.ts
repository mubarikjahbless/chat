import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { expressjwt } from 'express-jwt';
import { JwtPayload } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { UserModel } from '../models';

@Injectable()
export class SocketAuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  use(req, res, next) {
    expressjwt({
      secret: process.env.JWT_ACCESS_KEY,
      algorithms: ['HS256'],
      isRevoked: async (_, token) => {
        const payload = token?.payload as JwtPayload;
        if (!payload) {
          throw new UnauthorizedException(
            'The token contains invalid credentials or has expired',
          );
        }

        const user = await this.userModel.findById(payload._id).exec();
        if (!user || !user.loggedIn)
          throw new UnauthorizedException('The user has been logged out');

        return false;
      },
    }).unless({ path: ['/api/auth/login', '/api/auth/sign-up'] })(
      req,
      res,
      next,
    );
  }
}
