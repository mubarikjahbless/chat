import { Injectable } from '@nestjs/common';
import { User } from '../../common/types/message';
import { UserModel } from '../../common/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { ApiResponseService } from '../../common/utility/api-response.service';
import { loginPayload } from '../../common/helpers/jwt.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  public async createUser(user: User) {
    try {
      user.password = await hash(user.password, 10);
      await this.userModel.create(user);

      return this.apiResponseService.successResponse();
    } catch (error) {
      return this.apiResponseService.errorResponse(
        JSON.stringify(error),
        'We encounter an error whiles signing up user, kindly try again later',
      );
    }
  }

  public async login(user: User) {
    const result = await this.userModel.findOne({ name: user.name }).exec();
    if (result) {
      const isMatch = await compare(user.password, result.password);
      if (isMatch) {
        result.loggedIn = true;
        await result.save();
        return this.apiResponseService.successResponseWithData(
          'successful',
          loginPayload({
            id: result._id.toString(),
            name: result.name,
          } as User),
        );
      }
    }

    return this.apiResponseService.unauthorizedResponse(
      'Incorrect user name or password',
    );
  }

  public async logout(user: User) {
    try {
      await this.userModel.findByIdAndUpdate(user.id, { loggedIn: false });
      return this.apiResponseService.successResponse();
    } catch (error) {
      return this.apiResponseService.errorResponse(
        JSON.stringify(error),
        'failed to logout',
      );
    }
  }

  public async getUsers() {
    try {
      const result = await this.userModel.find().select('_id name').exec();
      return this.apiResponseService.successResponseWithData(
        'successul',
        result,
      );
    } catch (error) {
      return this.apiResponseService.errorResponse(
        JSON.stringify(error),
        'server error',
      );
    }
  }
}
