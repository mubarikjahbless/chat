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
exports.ChannelMembersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../../../common/models");
const api_response_service_1 = require("../../../common/utility/api-response.service");
let ChannelMembersService = class ChannelMembersService {
    constructor(channelMemberModel, apiResponse) {
        this.channelMemberModel = channelMemberModel;
        this.apiResponse = apiResponse;
    }
    async addMember(createChannelMemberDto) {
        try {
            const newMember = new this.channelMemberModel(createChannelMemberDto);
            const result = newMember.save();
            return this.apiResponse.successResponseWithData('success', result);
        }
        catch (error) {
        }
    }
    async setAdmin(channelId, userId) {
        return this.channelMemberModel.findOneAndUpdate({ channel: channelId, user: userId }, { is_admin: true }, { new: true });
    }
    async getChannelMembers(channelId) {
        return this.channelMemberModel.find({ channel: channelId }).populate('user');
    }
    async getChannelAdmins(channelId) {
        return this.channelMemberModel.find({ channel: channelId, is_admin: true }).populate('user');
    }
};
exports.ChannelMembersService = ChannelMembersService;
exports.ChannelMembersService = ChannelMembersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.ChannelMemberModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        api_response_service_1.ApiResponseService])
], ChannelMembersService);
//# sourceMappingURL=channel-members.service.js.map