import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { BaseSchema } from './base.model';
import { UserModel } from './user.model';
import { Content } from '../interfaces';
import { ChannelModel } from './channel.model';

export type ContentType = 'text' | 'file' | 'emoji';
@Schema()
export class MessageModel extends BaseSchema {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Channel' })
  channelId: ChannelModel;

  @Prop({required:true, type: Types.ObjectId, ref: 'User' })
  sender: UserModel;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  content: Content;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(MessageModel);
