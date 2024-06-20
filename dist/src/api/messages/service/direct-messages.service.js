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
exports.DirectMessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../../../common/models");
const api_response_service_1 = require("../../../common/utility/api-response.service");
let DirectMessagesService = class DirectMessagesService {
    constructor(directMessageModel, apiResponseService) {
        this.directMessageModel = directMessageModel;
        this.apiResponseService = apiResponseService;
    }
    async create(createDirectMessageDto) {
        const createdMessage = new this.directMessageModel(createDirectMessageDto);
        const result = await createdMessage.save();
        return this.apiResponseService.successResponseWithData('success', result);
    }
    async findAll() {
        const result = await this.directMessageModel.find().exec();
        return this.apiResponseService.successResponseWithData('success', result);
    }
    async findById(receiver, sender) {
        const message = await this.directMessageModel.find({ $or: [
                { $and: [{ receiver, sender }] },
                { $and: [{ receiver: sender, sender: receiver }] }
            ] }).exec();
        if (!message) {
            throw this.apiResponseService.notFoundResponse('Direct message not found');
        }
        return this.apiResponseService.successResponseWithData('success', message);
    }
    async findByUser(userId) {
        const result = await this.directMessageModel.find({ $or: [{ sender: userId }, { receiver: userId }] }).exec();
        return this.apiResponseService.successResponseWithData('success', result);
    }
};
exports.DirectMessagesService = DirectMessagesService;
exports.DirectMessagesService = DirectMessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.DirectMessageModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        api_response_service_1.ApiResponseService])
], DirectMessagesService);
//# sourceMappingURL=direct-messages.service.js.map