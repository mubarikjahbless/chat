"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../../../common/models");
const api_response_service_1 = require("../../../common/utility/api-response.service");
const mongodb_1 = require("mongodb");
let ChannelService = class ChannelService {
    constructor(model, apiResponseService) {
        this.model = model;
        this.apiResponseService = apiResponseService;
    }
    async getChannels() {
        const result = await this.model.find();
        return this.apiResponseService.successResponseWithData('all channels', result);
    }
    async searchChannel(searchKey) {
        const result = searchKey
            ? await this.model.find({
                name: { $regex: new RegExp(`.*${searchKey}.*`) },
            })
            : await this.model.find();
        return this.apiResponseService.successResponseWithData('query result', result);
    }
    async getChannelById(channelId) {
        const result = await this.model.findById({ _id: new mongodb_1.ObjectId(channelId) });
        return result
            ? this.apiResponseService.successResponseWithData('', result)
            : this.apiResponseService.notFoundResponse('The requested channel does not exist');
    }
    joinChannel(data, id) {
        const result = this.model.findByIdAndUpdate(new mongodb_1.ObjectId(id), { $push: { connectedUsers: data.user } }, { returnOriginal: false }).exec;
        const successResponseMessage = `successfully join channel ${result.name}`;
        return result
            ? this.apiResponseService.successResponse(successResponseMessage)
            : this.apiResponseService.notFoundResponse('The channel does not exist');
    }
    async createChannel(data) {
        const result = await this.model.create(data);
        const successResponseMessage = `Successfully created channel ${result.name}`;
        return this.apiResponseService.successResponseWithData(successResponseMessage, result);
    }
    async updateChannelInfo(channel, id) {
        const result = await this.model.findByIdAndUpdate(new mongodb_1.ObjectId(id), { $set: Object.assign({}, channel) }, { returnOriginal: false });
        return result
            ? this.apiResponseService.successResponseWithData('successfully update channel info', result)
            : this.apiResponseService.errorResponse('An error occured while updating channel', 'Sorry, we could not update channel info at the momment');
    }
    async deleteChannel(id) {
        const result = await this.model.findByIdAndDelete(id);
        return result
            ? this.apiResponseService.successResponse('Successfully deleted channel')
            : this.apiResponseService.notFoundResponse('The channel does not exist');
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.ChannelModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        api_response_service_1.ApiResponseService])
], ChannelService);
//# sourceMappingURL=channel.service.js.map