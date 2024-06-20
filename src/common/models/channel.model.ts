import { UserModel } from './user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';


@Schema()
export class ChannelModel {

  @Prop({ required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  created_by: UserModel;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: false })
  is_private: boolean;

  @Prop({ default: false })
  is_deleted: boolean;

}

export const ChannelSchema = SchemaFactory.createForClass(ChannelModel);
