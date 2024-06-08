import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateRoomDTO {
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'name too short minimum should be 5 charactors' })
  @MaxLength(20, { message: 'name too long maximum should be 20 charactors' })
  name: string;

  @IsOptional()
  @IsString()
  type: string;
}
