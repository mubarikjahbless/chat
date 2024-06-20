import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "./base.model";

@Schema()
export class MetadataModel extends BaseSchema {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Conversation' }] })
  conversation: Types.ObjectId;

  @Prop()
  key: string;

  @Prop()
  value: string;
}

export const MetadataSchema = SchemaFactory.createForClass(MetadataModel);
