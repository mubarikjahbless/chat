import {MessageModel} from './message.model';
import {UserModel} from './user.model';
import {ObjectID} from 'bson';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";

@Schema()
export class RoomModel {
  _id: ObjectID | string;

  @Prop({required: true})
  name: string;

  @Prop({type: [{type: Types.ObjectId, ref: 'Message'}]})
  messages: MessageModel[];

  @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
  connectedUsers: UserModel[];
}

export const RoomSchema = SchemaFactory.createForClass(RoomModel)
