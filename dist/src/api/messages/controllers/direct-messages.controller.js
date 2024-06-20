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
exports.DirectMessagesController = void 0;
const common_1 = require("@nestjs/common");
const create_direct_message_dto_1 = require("../dto/create-direct-message.dto");
const direct_messages_service_1 = require("../service/direct-messages.service");
const decorators_1 = require("../../../common/decorators");
let DirectMessagesController = class DirectMessagesController {
    constructor(directMessagesService) {
        this.directMessagesService = directMessagesService;
    }
    async create(createDirectMessageDto) {
        return await this.directMessagesService.create(createDirectMessageDto);
    }
    async findAll() {
        return await this.directMessagesService.findAll();
    }
    async findById(params) {
        return await this.directMessagesService.findById(params.receiver, params.sender);
    }
    async findByUser(userId) {
        return await this.directMessagesService.findByUser(userId);
    }
};
exports.DirectMessagesController = DirectMessagesController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_direct_message_dto_1.CreateDirectMessageDTO]),
    __metadata("design:returntype", Promise)
], DirectMessagesController.prototype, "create", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DirectMessagesController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':sender/:receiver'),
    __param(0, (0, common_1.Param)('')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DirectMessagesController.prototype, "findById", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DirectMessagesController.prototype, "findByUser", null);
exports.DirectMessagesController = DirectMessagesController = __decorate([
    (0, common_1.Controller)('direct-messages'),
    __metadata("design:paramtypes", [direct_messages_service_1.DirectMessagesService])
], DirectMessagesController);
//# sourceMappingURL=direct-messages.controller.js.map