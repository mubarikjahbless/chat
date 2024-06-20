import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserModel } from './user.model';


@Schema()
export class UserStatus {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: UserModel;

  @Prop()
  status: string;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const UserStatusSchema = SchemaFactory.createForClass(UserStatus);
