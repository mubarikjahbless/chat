import { IsString, IsNotEmpty} from "class-validator";
import { ObjectId, Types } from "mongoose";
import { Content } from "src/common/types/message";


export class CreateMessageDTO{

  @IsString()
  @IsNotEmpty()
  content: Content;

  @IsNotEmpty()
  @IsString()
  from: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  to: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  room?: Types.ObjectId;

  @IsString()
  status:string
}