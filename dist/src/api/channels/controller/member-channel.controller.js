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
exports.ChannelMembersController = void 0;
const common_1 = require("@nestjs/common");
const create_channel_members_dto_1 = require("../dto/create-channel-members.dto");
const channel_members_service_1 = require("../services/channel-members.service");
let ChannelMembersController = class ChannelMembersController {
    constructor(channelMembersService) {
        this.channelMembersService = channelMembersService;
    }
    async addMember(createChannelMemberDto) {
        return await this.channelMembersService.addMember(createChannelMemberDto);
    }
    async setAdmin(channelId, userId) {
        return await this.channelMembersService.setAdmin(channelId, userId);
    }
    async getMembers(channelId) {
        return await this.channelMembersService.getChannelMembers(channelId);
    }
    async getAdmins(channelId) {
        return await this.channelMembersService.getChannelAdmins(channelId);
    }
};
exports.ChannelMembersController = ChannelMembersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_channel_members_dto_1.CreateChannelMemberDto]),
    __metadata("design:returntype", Promise)
], ChannelMembersController.prototype, "addMember", null);
__decorate([
    (0, common_1.Patch)(':channelId/admin/:userId'),
    __param(0, (0, common_1.Param)('channelId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChannelMembersController.prototype, "setAdmin", null);
__decorate([
    (0, common_1.Get)(':channelId'),
    __param(0, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelMembersController.prototype, "getMembers", null);
__decorate([
    (0, common_1.Get)(':channelId/admins'),
    __param(0, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelMembersController.prototype, "getAdmins", null);
exports.ChannelMembersController = ChannelMembersController = __decorate([
    (0, common_1.Controller)('channel-members'),
    __metadata("design:paramtypes", [channel_members_service_1.ChannelMembersService])
], ChannelMembersController);
//# sourceMappingURL=member-channel.controller.js.map