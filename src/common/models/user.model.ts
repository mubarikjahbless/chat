import { MessageModel } from './message.model';
import { RoomModel } from './room.model';
import { ObjectID } from 'bson';
import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserModel {
  _id?: ObjectID | string;

  @Prop({
    required: true,
    maxlength: 20,
    minlength: 5,
    unique: true,
  })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  loggedIn: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages?: MessageModel[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Room' }] })
  joinedRooms?: RoomModel[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
