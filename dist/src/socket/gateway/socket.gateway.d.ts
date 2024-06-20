/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Model } from 'mongoose';
import { CustomSocket } from '../../common/adapters/auth.adapter';
import { MessageModel, ChannelModel, UserModel } from '../../common/models';
import { Message } from '../../common/interfaces/message';
import { MessageService } from '../../api/messages/service/messages.service';
import { DirectMessagesService } from 'src/api/messages/service/direct-messages.service';
export declare class SocketGateway implements OnGatewayDisconnect, OnGatewayConnection {
    private readonly messagesModel;
    private readonly channelsModel;
    private readonly usersModel;
    private readonly messageService;
    private readonly directMessageService;
    constructor(messagesModel: Model<MessageModel>, channelsModel: Model<ChannelModel>, usersModel: Model<UserModel>, messageService: MessageService, directMessageService: DirectMessagesService);
    server: Server;
    handleConnection(client: CustomSocket, ...args: any[]): Promise<void>;
    handleDisconnect(client: CustomSocket): Promise<void>;
    enterChatChannel(client: CustomSocket, channel: {
        name: string;
        channelId: string;
    }): Promise<void>;
    leaveChatChannel(client: CustomSocket, channelId: string): Promise<void>;
    addMessage(client: CustomSocket, message: Message): Promise<void>;
    chatPrivately(client: CustomSocket, message: Message): Promise<void>;
    private getReceiver;
    private getConnectedUsers;
}
