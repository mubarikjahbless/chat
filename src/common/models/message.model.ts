import { RoomModel } from './room.model';
import { ObjectID } from 'bson';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { BaseSchema } from './base.model';

export type ContentType = 'text' | 'file' | 'emoji';
export interface Content {
  type: ContentType;
  text?: string;
  fileUrl?: string;
  emoji?: string;
}
@Schema()
export class MessageModel extends BaseSchema {
  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  content: Content;

  @Prop({ required: true, ref: 'User', type: Types.ObjectId })
  from: Types.ObjectId;

  @Prop({ ref: 'User', type: Types.ObjectId })
  to: Types.ObjectId;

  @Prop({ required: true, ref: 'Room', type: Types.ObjectId })
  room: RoomModel;

  @Prop()
  status: string;
}

export const MessageSchema = SchemaFactory.createForClass(MessageModel);
