import { Controller, Get, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../../common/models';
import { Model } from 'mongoose';

@Controller('messages')
export class MessagesController {
  constructor(@InjectModel(Message.name) private readonly model: Model<Message>) {}

  @Get()
  find(@Query('where') where) {
    where = JSON.parse(where || '{}');
    return this.model.find(where).populate({path: 'owner', select: '_id nickname'}); 
  }
}
