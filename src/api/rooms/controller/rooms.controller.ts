import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoomDTO } from '../dto/create-room.dto';
import { RoomService } from '../services/room.service';
import { UpdateRoomDTO } from '../dto/update-room.dto';
import { Public } from '../../../common/decorators';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  searchRoom(@Query('q') searchQuery: string) {
    return this.roomService.searchRoom(searchQuery);
  }

  @Get('/:roomId')
  findRoomById(@Param('roomId') id: string) {
    return this.roomService.getRoomById(id);
  }

  @Post()
  async save(
    @Body(new ValidationPipe({ transform: true })) room: CreateRoomDTO,
  ) {
    return await this.roomService.createRoom(room);
  }

  @Put('/join/:roomId')
  async joinGroup(@Body() data, @Param('roomId') id: string) {
    return this.roomService.joinRoom(data, id);
  }

  @Put('/:roomId')
  @Public()
  async updateRoom(@Body() room: UpdateRoomDTO, @Param('roomId') id: string) {
    return this.roomService.updateRoomInfo(room, id);
  }

  @Delete('/delete/:roomId')
  @Public()
  async deleteRoom(@Param('roomId') id: string) {
    return this.roomService.deleteRoom(id);
  }
}
