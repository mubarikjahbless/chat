import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Content } from '../../../common/types/message';

export class UpdateMessageDTO {
  @IsString()
  @IsNotEmpty()
  content: Content;

  @IsOptional()
  @IsString()
  from: Types.ObjectId;

  @IsOptional()
  @IsString()
  to: Types.ObjectId;

  @IsOptional()
  @IsString()
  room?: Types.ObjectId;

  @IsString()
  status: string;
}
