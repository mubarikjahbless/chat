import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { UserModel } from './user.model';
import { Content } from '../interfaces';


@Schema()
export class DirectMessageModel {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  sender: UserModel;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  receiver: UserModel;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  content: Content;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const DirectMessageSchema = SchemaFactory.createForClass(DirectMessageModel);
