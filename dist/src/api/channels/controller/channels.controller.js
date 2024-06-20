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
exports.ChannelsController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../common/decorators");
const create_channel_dto_1 = require("../dto/create-channel.dto");
const update_channel_dto_1 = require("../dto/update-channel.dto");
const channel_service_1 = require("../services/channel.service");
let ChannelsController = class ChannelsController {
    constructor(channelService) {
        this.channelService = channelService;
    }
    searchChannel(searchQuery) {
        return this.channelService.searchChannel(searchQuery);
    }
    findChannelById(id) {
        return this.channelService.getChannelById(id);
    }
    async save(channel) {
        return await this.channelService.createChannel(channel);
    }
    async joinGroup(data, id) {
        return this.channelService.joinChannel(data, id);
    }
    async updateChannel(channel, id) {
        return this.channelService.updateChannelInfo(channel, id);
    }
    async deleteChannel(id) {
        return this.channelService.deleteChannel(id);
    }
};
exports.ChannelsController = ChannelsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "searchChannel", null);
__decorate([
    (0, common_1.Get)('/:channelId'),
    __param(0, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "findChannelById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_channel_dto_1.CreateChannelDTO]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "save", null);
__decorate([
    (0, common_1.Put)('/join/:channelId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "joinGroup", null);
__decorate([
    (0, common_1.Put)('/:channelId'),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_channel_dto_1.UpdateChannelDTO, String]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "updateChannel", null);
__decorate([
    (0, common_1.Delete)('/delete/:channelId'),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "deleteChannel", null);
exports.ChannelsController = ChannelsController = __decorate([
    (0, common_1.Controller)('channels'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelsController);
//# sourceMappingURL=channels.controller.js.map