import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { Content } from "../../../common/interfaces";


export class CreateDirectMessageDTO{
    @IsString()
    @IsNotEmpty()
    content: Content;
  
    @IsNotEmpty()
    @IsString()
    sender: Types.ObjectId;
  
    @IsNotEmpty()
    @IsString()
    receiver: Types.ObjectId;
  
    @IsString()
    status: string;
}