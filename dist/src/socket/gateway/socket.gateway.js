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
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../../common/models");
const chat_events_1 = require("../../common/enums/chat-events");
const chat_channel_type_1 = require("../../common/enums/chat-channel-type");
const message_status_1 = require("../../common/enums/message-status");
const messages_service_1 = require("../../api/messages/service/messages.service");
const direct_messages_service_1 = require("../../api/messages/service/direct-messages.service");
const port = 5000;
let SocketGateway = class SocketGateway {
    constructor(messagesModel, channelsModel, usersModel, messageService, directMessageService) {
        this.messagesModel = messagesModel;
        this.channelsModel = channelsModel;
        this.usersModel = usersModel;
        this.messageService = messageService;
        this.directMessageService = directMessageService;
    }
    async handleConnection(client, ...args) {
        client.join(client.user.id.toString());
        this.getConnectedUsers();
        this.server.emit(chat_events_1.ChatEvents.USERCONNECTED, await this.getConnectedUsers());
    }
    async handleDisconnect(client) {
        this.server.emit(chat_events_1.ChatEvents.USERLEFT, {
            user: client.user.name,
            event: 'left',
        });
    }
    async enterChatChannel(client, channel) {
        client.join(channel.channelId);
        client.broadcast
            .to(channel.channelId)
            .emit(chat_events_1.ChatEvents.USERJOIN, { user: client.user.name, event: 'joined' });
    }
    async leaveChatChannel(client, channelId) {
        client.broadcast
            .to(channelId)
            .emit(chat_events_1.ChatEvents.USERLEFT, { user: client.user.name, event: 'left' });
        client.leave(channelId);
    }
    async addMessage(client, message) {
        message.timeSent = new Date();
        const messageTDO = {
            content: { text: message.content.text, type: chat_channel_type_1.ChatChannelType.PRIVATE },
            sender: new mongoose_2.Types.ObjectId(client.user.id),
            to: new mongoose_2.Types.ObjectId(message.to),
            status: message_status_1.MessageStatus.DELIVERED,
            channelId: new mongoose_2.Types.ObjectId(message.chatId),
        };
        const senderMessage = {
            content: { text: message.content.text, type: chat_channel_type_1.ChatChannelType.PRIVATE },
            sender: { name: client.user.name, _id: client.user.id },
            status: message_status_1.MessageStatus.DELIVERED,
            chatId: new mongoose_2.Types.ObjectId(message.chatId),
        };
        await this.messageService.saveMessage(messageTDO);
        this.server.in(message.chatId).emit(chat_events_1.ChatEvents.MESSAGE, senderMessage);
    }
    async chatPrivately(client, message) {
        message.sender = client.user.id;
        const messageTDO = {
            content: { text: message.content.text, type: chat_channel_type_1.ChatChannelType.PRIVATE },
            sender: new mongoose_2.Types.ObjectId(client.user.id),
            receiver: new mongoose_2.Types.ObjectId(message.to),
            status: message_status_1.MessageStatus.DELIVERED,
        };
        await this.directMessageService.create(messageTDO);
        const receiver = await this.getReceiver(message.to);
        if (receiver) {
            client.to(receiver).emit(chat_events_1.ChatEvents.MESSAGE, message);
            client.emit(chat_events_1.ChatEvents.MESSAGE, message);
        }
        else {
        }
    }
    async getReceiver(id) {
        const client = (await this.server.in(id.toString()).fetchSockets())[0];
        return client ? client.id : '';
    }
    async getConnectedUsers() {
        const connectedUsers = await this.server.fetchSockets();
        return connectedUsers.map((socketInstance) => socketInstance['user']);
    }
};
exports.SocketGateway = SocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_events_1.ChatEvents.ENTERCHATROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "enterChatChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_events_1.ChatEvents.LEAVECHATROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "leaveChatChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_events_1.ChatEvents.GROUPMESSAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "addMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_events_1.ChatEvents.PRIVATEMESSAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "chatPrivately", null);
exports.SocketGateway = SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(port, {
        cors: {
            methods: ['GET', 'POST'],
            allowedHeaders: 'Content-Type, x-requested-with',
            credentials: true,
        },
    }),
    __param(0, (0, mongoose_1.InjectModel)(models_1.MessageModel.name)),
    __param(1, (0, mongoose_1.InjectModel)(models_1.ChannelModel.name)),
    __param(2, (0, mongoose_1.InjectModel)(models_1.UserModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        messages_service_1.MessageService,
        direct_messages_service_1.DirectMessagesService])
], SocketGateway);
//# sourceMappingURL=socket.gateway.js.map