import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class BaseSchema {
  readonly _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}
