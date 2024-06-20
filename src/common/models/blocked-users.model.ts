import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema, UserModel } from ".";
import { Types } from "mongoose";

@Schema()
export class BlockedUserModel extends BaseSchema {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  user: UserModel;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  blocked_user: UserModel;
}

export const BlockedUserSchema = SchemaFactory.createForClass(BlockedUserModel);

