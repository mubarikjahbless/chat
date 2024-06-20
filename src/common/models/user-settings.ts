import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "./base.model";
import { UserModel } from "./user.model";


@Schema()
export class UserSettingsModel extends BaseSchema {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  user: UserModel;

  @Prop({ required: true })
  notification_preferences: string[];

  @Prop({ nullable: true })
  chat_theme?: string;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettingsModel);
