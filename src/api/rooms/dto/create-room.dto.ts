import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ChatRoomType } from '../../../common/enums/chat-room-type';

export class CreateRoomDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {message:'name too short minimum should be 5 charactors'})
  @MaxLength(20,{message:'name too long maximum should be 20 charactors'})
  name: string;

  @IsString()
  @IsOptional()
  type: string = ChatRoomType.PUBLIC;


// TODO: remove these below properties as arrays 
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  @Type(() => String)
  messages?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  members?: string[];



}