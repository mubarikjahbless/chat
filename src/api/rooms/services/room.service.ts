import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoomModel } from "../../../common/models";
import { ApiResponseService } from "../../../common/utility/api-response.service";
import { ObjectId } from 'mongodb';
import { CreateRoomDTO } from "../dto/create-room.dto";
import { UpdateRoomDTO } from "../dto/update-room.dto";

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(RoomModel.name) private readonly model: Model<RoomModel>,
        private readonly apiResponseService: ApiResponseService,
    ) { }


    public async getRooms() {
        const result =  await this.model.find();
        return this.apiResponseService.successResponseWithData('all rooms', result)
    }

    public async searchRoom(searchKey: string) {
        const result = searchKey ? await this.model.find({ name: { $regex: new RegExp(`.*${searchKey}.*`) } }) : await this.model.find();
        return this.apiResponseService.successResponseWithData('query result', result)
    }

    public async getRoomById(roomId: string) {
        const result = await this.model.findById({ _id: new ObjectId(roomId) })
        return result ?
            this.apiResponseService.successResponseWithData('', result)
            : this.apiResponseService.notFoundResponse('The requested room does not exist')
    }

    public joinRoom(data: any, id: string) {
        const result = this.model.findByIdAndUpdate(new ObjectId(id), { $push: { connectedUsers: data.user } }, { returnOriginal: false }).exec
        const successResponseMessage = `successfully join room ${result.name}`
        return result ? this.apiResponseService.successResponse(successResponseMessage) : this.apiResponseService.notFoundResponse('The room does not exist')
    }

    public async createRoom(data: CreateRoomDTO) {
        const result = await this.model.create(data);
        const successResponseMessage = `Successfully created room ${result.name}`
        return this.apiResponseService.successResponseWithData(successResponseMessage, result)
    }

    public async updateRoomInfo(room: UpdateRoomDTO, id: string) {
        const result = await this.model.findByIdAndUpdate(new ObjectId(id), { $set: { ...room } }, { returnOriginal: false })
        return result ?
            this.apiResponseService.successResponseWithData('successfully update room info', result)
            : this.apiResponseService.errorResponse('An error occured while updating room', 'Sorry, we could not update room info at the momment')
    }


    public async deleteRoom(id: string) {
        const result = await this.model.findByIdAndDelete(id)        
        return result
            ? this.apiResponseService.successResponse('Successfully deleted room')
            : this.apiResponseService.notFoundResponse("The room does not exist")
  }
}