import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateDirectMessageDTO } from '../dto/create-direct-message.dto';
import { DirectMessagesService } from '../service/direct-messages.service';
import { Public } from '../../../common/decorators';


@Controller('direct-messages')
export class DirectMessagesController {
  constructor(
    private readonly directMessagesService: DirectMessagesService,
  ) {}

  @Public()
  @Post()
  async create(@Body() createDirectMessageDto: CreateDirectMessageDTO) {
   return await this.directMessagesService.create(createDirectMessageDto);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.directMessagesService.findAll();
  }

  @Public()
  @Get(':sender/:receiver')
  async findById(@Param('') params:{sender:string, receiver:string}) {    
    return await this.directMessagesService.findById(params.receiver, params.sender);
  }
  
  @Public()
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return await this.directMessagesService.findByUser(userId);
  }
}
