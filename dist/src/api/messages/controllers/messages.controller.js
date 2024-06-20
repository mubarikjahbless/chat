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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("../service/messages.service");
const create_message_dto_1 = require("../dto/create-message.dto");
const decorators_1 = require("../../../common/decorators");
let MessagesController = class MessagesController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    find(chatId) {
        return this.messageService.getMessages(chatId);
    }
    getDirectChatMessages(where) {
        return this.messageService.getDirectChatMessages(where);
    }
    getAllMessages() {
        return this.messageService.getallMessages();
    }
    createMessage(data) {
        return this.messageService.saveMessage(data);
    }
    deleteMessage(id) {
        return this.messageService.deleteMessage(id);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "find", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/direct-chat'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "getDirectChatMessages", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "getAllMessages", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDTO]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "createMessage", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "deleteMessage", null);
exports.MessagesController = MessagesController = __decorate([
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessageService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map