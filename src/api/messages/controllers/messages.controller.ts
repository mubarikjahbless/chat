import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MessageService } from '../service/messages.service';
import { UpdateMessageDTO } from '../dto/update-message.dto';
import { CreateMessageDTO } from '../dto/create-message.dto';
import { Public } from '../../../common/decorators';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}

  @Public()
  @Get()
  find(@Query('where') where) {
    where = JSON.parse(where || '{}');

    return this.messageService.getMessages(where);
  }

  @Public()
  @Get('/direct-chat')
  getDirectChatMessages(@Query() where) {
    return this.messageService.getDirectChatMessages(where);
  }

  @Public()
  @Get('/all')
  getAllMessages() {
    return this.messageService.getallMessages();
  }

  @Public()
  @Put()
  updateMessage(@Body() data: UpdateMessageDTO) {
    return this.messageService.getMessages(data);
  }

  @Public()
  @Post()
  createMessage(@Body() data: CreateMessageDTO) {
    return this.messageService.saveMessage(data);
  }

  @Public()
  @Delete()
  deleteMessage(@Body() id: string) {
    return this.messageService.deleteMessage(id);
  }
}
