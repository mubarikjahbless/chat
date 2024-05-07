import { Body, Controller, Get, Post, Req, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { CurrentUser, Public } from '../../common/decorators';
import { User } from '../../common/models';
import { createJwtToken } from 'src/common/helpers/jwt.helper';

@Controller('auth')
export class AuthController {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {} 

  @Post('login')
  @Public()
  async login(@Body() credentials) {
    const user = await this.userModel.findOne({nickname: credentials.nickname}).exec();
    if (!user) throw new UnauthorizedException('The nickname/password combination is invalid');

    const isMatch = await compare(credentials.password, user.password);
    if (!isMatch) throw new UnauthorizedException('The nickname/password combination is invalid');

    user.loggedIn = true;

    await user.save();

    return createJwtToken({_id:user._id, nickname:user.nickname})
  }

  @Post('logout')
  async logout(@CurrentUser() user) {    
    await this.userModel.findByIdAndUpdate(user._id, {loggedIn: false});
    return {message: 'Logout Successfully'};
  }

  @Post('sign-up')
  @Public()
  async signUp(@Body() signUpCredentials) {
    signUpCredentials.password = await hash(signUpCredentials.password, 10);
    await this.userModel.create(signUpCredentials);
    return {message: 'User Created Successfully'};
  }

  @Get('users')
  @Public()
  getAllUser(){
    return this.userModel.find()
  }
}
