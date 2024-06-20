import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema, MessageModel, UserModel } from ".";
import { Types } from "mongoose";


@Schema()
export class MessageStatusModel extends BaseSchema {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  message: MessageModel;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  user: UserModel;

  @Prop()
  status: 'delivered' | 'read';

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const MessageStatusSchema = SchemaFactory.createForClass(MessageStatusModel);
