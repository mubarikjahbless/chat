import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DirectMessageModel } from 'src/common/models';
import { ApiResponseService } from '../../../common/utility/api-response.service';
import { CreateDirectMessageDTO } from '../dto/create-direct-message.dto';

@Injectable()
export class DirectMessagesService {
  constructor(
    @InjectModel(DirectMessageModel.name) private directMessageModel: Model<DirectMessageModel>,
    private readonly apiResponseService: ApiResponseService,
  ) {}

 public async create(createDirectMessageDto: CreateDirectMessageDTO){
    const createdMessage = new this.directMessageModel(createDirectMessageDto);
    const result = await  createdMessage.save();
    return this.apiResponseService.successResponseWithData('success', result)
  }

  public async findAll() {
    const result = await this.directMessageModel.find().exec();
    return this.apiResponseService.successResponseWithData('success', result)
  }

 public async findById(receiver: string, sender:string) {
    const message = await this.directMessageModel.find({$or:[
      {$and:[{receiver, sender}]},
      {$and:[{receiver:sender, sender:receiver}]}
    ]}).exec();
    if (!message) {
      throw this.apiResponseService.notFoundResponse('Direct message not found');
    }
    return this.apiResponseService.successResponseWithData('success', message);
  }

  public async findByUser(userId: string) {
    const result = await this.directMessageModel.find({ $or: [{ sender: userId }, { receiver: userId }] }).exec();
    return this.apiResponseService.successResponseWithData('success', result)
  }
}
