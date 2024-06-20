import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateChannelMemberDto {
  @IsNotEmpty()
  readonly channel: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  readonly user: MongooseSchema.Types.ObjectId;

  @IsOptional()
  @IsBoolean()
  readonly is_admin?: boolean;
}
