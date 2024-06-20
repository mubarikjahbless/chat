import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChannelModel } from '../../../common/models';
import { ApiResponseService } from '../../../common/utility/api-response.service';
import { ObjectId } from 'mongodb';
import { CreateChannelDTO } from '../dto/create-channel.dto';
import { UpdateChannelDTO } from '../dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(ChannelModel.name) private readonly model: Model<ChannelModel>,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  public async getChannels() {
    const result = await this.model.find();
    return this.apiResponseService.successResponseWithData('all channels', result);
  }

  public async searchChannel(searchKey: string) {
    const result = searchKey
      ? await this.model.find({
          name: { $regex: new RegExp(`.*${searchKey}.*`) },
        })
      : await this.model.find();
    return this.apiResponseService.successResponseWithData(
      'query result',
      result,
    );
  }

  public async getChannelById(channelId: string) {
    const result = await this.model.findById({ _id: new ObjectId(channelId) });
    return result
      ? this.apiResponseService.successResponseWithData('', result)
      : this.apiResponseService.notFoundResponse(
          'The requested channel does not exist',
        );
  }

  public joinChannel(data: any, id: string) {
    const result = this.model.findByIdAndUpdate(
      new ObjectId(id),
      { $push: { connectedUsers: data.user } },
      { returnOriginal: false },
    ).exec;
    const successResponseMessage = `successfully join channel ${result.name}`;
    return result
      ? this.apiResponseService.successResponse(successResponseMessage)
      : this.apiResponseService.notFoundResponse('The channel does not exist');
  }

  public async createChannel(data: CreateChannelDTO) {
    const result = await this.model.create(data);
    const successResponseMessage = `Successfully created channel ${result.name}`;
    return this.apiResponseService.successResponseWithData(
      successResponseMessage,
      result,
    );
  }

  public async updateChannelInfo(channel: UpdateChannelDTO, id: string) {
    const result = await this.model.findByIdAndUpdate(
      new ObjectId(id),
      { $set: { ...channel } },
      { returnOriginal: false },
    );
    return result
      ? this.apiResponseService.successResponseWithData(
          'successfully update channel info',
          result,
        )
      : this.apiResponseService.errorResponse(
          'An error occured while updating channel',
          'Sorry, we could not update channel info at the momment',
        );
  }

  public async deleteChannel(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    return result
      ? this.apiResponseService.successResponse('Successfully deleted channel')
      : this.apiResponseService.notFoundResponse('The channel does not exist');
  }
}
