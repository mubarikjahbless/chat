import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ChannelMemberModel } from '../../../common/models';
import { CreateChannelMemberDto } from '../dto/create-channel-members.dto';
import { ChannelMembersService } from '../services/channel-members.service';
import { ApiResponseService } from 'src/common/utility/api-response.service';

@Controller('channel-members')
export class ChannelMembersController {
  constructor(private readonly channelMembersService: ChannelMembersService) {}

  @Post()
  async addMember(@Body() createChannelMemberDto: CreateChannelMemberDto) {
   return await this.channelMembersService.addMember(createChannelMemberDto);
  }

  @Patch(':channelId/admin/:userId')
  async setAdmin(
    @Param('channelId') channelId: string,
    @Param('userId') userId: string,
  ) {
   return await this.channelMembersService.setAdmin(channelId, userId);
    
  }

  @Get(':channelId')
  async getMembers(@Param('channelId') channelId: string){
    return await this.channelMembersService.getChannelMembers(channelId);
  }

  @Get(':channelId/admins')
  async getAdmins(@Param('channelId') channelId: string){
   return await this.channelMembersService.getChannelAdmins(channelId);
  }
}
