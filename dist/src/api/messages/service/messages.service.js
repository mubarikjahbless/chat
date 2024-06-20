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
exports.MessageService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../../../common/models");
const api_response_service_1 = require("../../../common/utility/api-response.service");
let MessageService = class MessageService {
    constructor(messageModel, apiResponseService) {
        this.messageModel = messageModel;
        this.apiResponseService = apiResponseService;
    }
    async getMessages(channelId) {
        if (!channelId) {
            return this.apiResponseService.notFoundResponse('No messages found for the selected Id');
        }
        const result = await this.messageModel
            .find({ channelId: new mongoose_2.Types.ObjectId(channelId) })
            .populate({ path: 'sender', model: models_1.UserModel.name });
        return this.apiResponseService.successResponseWithData('successful', result);
    }
    async getDirectChatMessages(where) {
        const result = await this.messageModel.aggregate([
            {
                $match: {
                    from: where.from,
                    to: where.to,
                },
            },
            {
                $lookup: {
                    from: 'User',
                    localField: 'from',
                    foreignField: '_id',
                    as: 'fromUserDetails',
                },
            },
            {
                $lookup: {
                    from: 'User',
                    localField: 'to',
                    foreignField: '_id',
                    as: 'toUserDetails',
                },
            },
            {
                $project: {
                    _id: 1,
                    message: 1,
                    content: 1,
                    profileInfo: { $arrayElemAt: ['$fromUserDetails', 0] },
                },
            },
        ]);
        return this.apiResponseService.successResponseWithData('success', result);
    }
    async getallMessages() {
        const result = await this.messageModel.find();
        return this.apiResponseService.successResponseWithData('success', result);
    }
    async saveMessage(message) {
        const result = await this.messageModel.create(message);
        return this.apiResponseService.successResponseWithData('successful', result);
    }
    async updateMessage(data) {
        const result = await this.messageModel.findByIdAndUpdate(data.id, {
            $set: Object.assign({}, data),
        });
        return result
            ? this.apiResponseService.successResponse('successful')
            : this.apiResponseService.notFoundResponse();
    }
    async deleteMessage(id) {
        const result = await this.messageModel.findByIdAndDelete(id);
        return result
            ? this.apiResponseService.successResponse('successfully deleted')
            : this.apiResponseService.notFoundResponse();
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(models_1.MessageModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        api_response_service_1.ApiResponseService])
], MessageService);
//# sourceMappingURL=messages.service.js.map