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
import { Public } from '../../../common/decorators';
import { CreateChannelDTO } from '../dto/create-channel.dto';
import { UpdateChannelDTO } from '../dto/update-channel.dto';
import { ChannelService } from '../services/channel.service';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  searchChannel(@Query('q') searchQuery: string) {
    return this.channelService.searchChannel(searchQuery);
  }

  @Get('/:channelId')
  findChannelById(@Param('channelId') id: string) {
    return this.channelService.getChannelById(id);
  }

  @Post()
  async save(
    @Body(new ValidationPipe({ transform: true })) channel: CreateChannelDTO,
  ) {
    return await this.channelService.createChannel(channel);
  }

  @Put('/join/:channelId')
  async joinGroup(@Body() data, @Param('channelId') id: string) {
    return this.channelService.joinChannel(data, id);
  }

  @Put('/:channelId')
  @Public()
  async updateChannel(@Body() channel: UpdateChannelDTO, @Param('channelId') id: string) {
    return this.channelService.updateChannelInfo(channel, id);
  }

  @Delete('/delete/:channelId')
  @Public()
  async deleteChannel(@Param('channelId') id: string) {
    return this.channelService.deleteChannel(id);
  }
}
