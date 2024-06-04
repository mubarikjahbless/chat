import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class UpdateMessageDTO{

    @IsNotEmpty()
   _id: ObjectId
 
   @IsOptional()
   @IsString()
   @IsNotEmpty()
   text: string;

   @IsOptional()
   @IsNotEmpty()
   @IsString()
   owner?: ObjectId;
 
   @IsOptional()
   @IsNotEmpty()
   @IsString()
   room?: ObjectId;
 }