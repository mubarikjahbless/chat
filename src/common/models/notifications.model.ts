import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "./base.model";
import { UserModel } from "./user.model";
import { Content } from "../interfaces";


@Schema()
export class NotificationModel extends BaseSchema {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  user: UserModel;

  @Prop()
  type: string;

  @Prop()
  content: Content;

  @Prop({ type: 'timestamp' })
  timestamp: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(NotificationModel);
