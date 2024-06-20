import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "./base.model";
import { Schema as MongooseSchema } from 'mongoose';
import { ChannelModel } from "./channel.model";
import { UserModel } from "./user.model";


@Schema()
export class ChannelMemberModel extends BaseSchema {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Channel' })
  channel: ChannelModel;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: UserModel;

  @Prop({ default: Date.now })
  joined_at: Date;

  @Prop({ default: false })
  is_admin: boolean;
}

export const ChannelMemberSchema = SchemaFactory.createForClass(ChannelMemberModel);
