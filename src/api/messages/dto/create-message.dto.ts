import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { Content } from '../../../common/interfaces';

export class CreateMessageDTO {
  @IsString()
  @IsNotEmpty()
  content: Content;

  @IsNotEmpty()
  @IsString()
  sender: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  to: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  channelId?: Types.ObjectId;

  @IsString()
  status: string;
}
