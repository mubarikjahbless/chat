import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChannelMemberModel } from '../../../common/models';
import { CreateChannelMemberDto } from '../dto/create-channel-members.dto';
import { ApiResponseService } from 'src/common/utility/api-response.service';

@Injectable()
export class ChannelMembersService {
  constructor(
    @InjectModel(ChannelMemberModel.name) private channelMemberModel: Model<ChannelMemberModel>,
    private apiResponse : ApiResponseService
  ) {}

 public async addMember(createChannelMemberDto: CreateChannelMemberDto){
    try {
      const newMember = new this.channelMemberModel(createChannelMemberDto);
      const result = newMember.save();
      return  this.apiResponse.successResponseWithData('success', result)
      
    } catch (error) {
      
    }
  }

  public async setAdmin(channelId: string, userId: string): Promise<ChannelMemberModel> {
    return this.channelMemberModel.findOneAndUpdate(
      { channel: channelId, user: userId },
      { is_admin: true },
      { new: true },
    );
  }

 public async getChannelMembers(channelId: string): Promise<ChannelMemberModel[]> {
    return this.channelMemberModel.find({ channel: channelId }).populate('user');
  }

  public async getChannelAdmins(channelId: string): Promise<ChannelMemberModel[]> {
    return this.channelMemberModel.find({ channel: channelId, is_admin: true }).populate('user');
  }
}
