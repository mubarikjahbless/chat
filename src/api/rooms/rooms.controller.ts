import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Room } from '../../common/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Public } from 'src/common/decorators';

@Controller('rooms')
export class RoomsController {
  constructor(@InjectModel(Room.name) private readonly model: Model<Room>) {} 

  @Get()
  find(@Query('q') q) { 
    if (q) return this.model.find({name: {$regex: new RegExp(`.*${q}.*`)}});
    else return this.model.find();
  }

  @Get('/:id')
  findById(@Param('id') id: string) { 
    return this.model.findById(id);
  }

  @Post()
  @Public()
  async save(@Body() item) { 
    const room: Room = {
      messages: [],
      connectedUsers: [],
      ...item
    }
    
    return room._id ? this.model.findByIdAndUpdate(room._id, room, {new: true}) : this.model.create(room);
  }

  @Put('/:id')
  async joinGroup(@Body() data){
      if(data){
        return this.model.findByIdAndUpdate(data._id,{$push:{connectedUsers:data.user}})
      } else{
        return 'provide user and group user id'
      }
  }
}
