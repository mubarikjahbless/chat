import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MessageModel } from "../../../common/models";
import { ApiResponseService } from "../../../common/utility/api-response.service";
import { CreateMessageDTO } from "../dto/create-message.dto";
export class MessageService {

    constructor(@InjectModel(MessageModel.name) private readonly messageModel: Model<MessageModel>,
        private readonly apiResponseService: ApiResponseService,) {

    }

    public async getMessages(where: any) {
        const result = await this.messageModel.find(where).populate({ path: 'from', select: '_id name' })        
        return this.apiResponseService.successResponseWithData('successful', result)
    }
   
    public async getDirectChatMessages(where){
     const result = await this.messageModel.aggregate([
        {
            $match: {
              from: where.from,
              to: where.to
            }
          },
          {
            $lookup: {
              from: "User",
              localField: "from",
              foreignField: "_id",
              as: "fromUserDetails"
            }
          },
          {
            $lookup: {
              from: "User",
              localField: "to",
              foreignField: "_id",
              as: "toUserDetails"
            }
          },
          {
            $project: {
              _id: 1,
              message: 1,
              content:1,
              profileInfo: { "$arrayElemAt": ["$fromUserDetails", 0] },
            }
          }
     ])
     
     return this.apiResponseService.successResponseWithData('success', result)
    }

    public async getallMessages(){
        const result = await this.messageModel.find()
        return this.apiResponseService.successResponseWithData('success', result)
    }

    public async saveMessage(message: CreateMessageDTO) {

        const result = await this.messageModel.create(message)

        return this.apiResponseService.successResponseWithData('successful', result)
    }

  public async updateMessage(data){
      const result =  await this.messageModel.findByIdAndUpdate(data.id, {$set:{...data}});
      return result? this.apiResponseService.successResponse('successful'): this.apiResponseService.notFoundResponse()
  }

  public async deleteMessage(id:string){
    const result = await this.messageModel.findByIdAndDelete(id);
    return result? this.apiResponseService.successResponse('successfully deleted'): this.apiResponseService.notFoundResponse()
  }

}