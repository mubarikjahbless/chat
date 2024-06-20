import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CustomSocket } from '../../common/adapters/auth.adapter';
import { MessageModel, ChannelModel, UserModel } from '../../common/models';
import { ChatEvents } from '../../common/enums/chat-events';
import { Message } from '../../common/interfaces/message';
import { CreateMessageDTO } from '../../api/messages/dto/create-message.dto';
import { ChatChannelType } from '../../common/enums/chat-channel-type';
import { MessageStatus } from '../../common/enums/message-status';
import { MessageService } from '../../api/messages/service/messages.service';
import { CreateDirectMessageDTO } from 'src/api/messages/dto/create-direct-message.dto';
import { DirectMessagesService } from 'src/api/messages/service/direct-messages.service';

const port = 5000;

@WebSocketGateway(port, {
  cors: {
    methods: ['GET', 'POST'],
    allowedHeaders: 'Content-Type, x-requested-with',
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(
    @InjectModel(MessageModel.name)
    private readonly messagesModel: Model<MessageModel>,
    @InjectModel(ChannelModel.name) private readonly channelsModel: Model<ChannelModel>,
    @InjectModel(UserModel.name) private readonly usersModel: Model<UserModel>,
    private readonly messageService: MessageService,
    private readonly directMessageService: DirectMessagesService,
  ) { }

  @WebSocketServer()
  server: Server;

  async handleConnection(client: CustomSocket, ...args: any[]) {
    client.join(client.user.id.toString());
    this.getConnectedUsers();
    this.server.emit(ChatEvents.USERCONNECTED, await this.getConnectedUsers());
  }

  async handleDisconnect(client: CustomSocket) {
    this.server.emit(ChatEvents.USERLEFT, {
      user: client.user.name,
      event: 'left',
    });
  }

  @SubscribeMessage(ChatEvents.ENTERCHATROOM)
  async enterChatChannel(client: CustomSocket, channel: { name: string, channelId: string }) {
    client.join(channel.channelId);

    client.broadcast
      .to(channel.channelId)
      .emit(ChatEvents.USERJOIN, { user: client.user.name, event: 'joined' });
  }

  @SubscribeMessage(ChatEvents.LEAVECHATROOM)
  async leaveChatChannel(client: CustomSocket, channelId: string) {
    client.broadcast
      .to(channelId)
      .emit(ChatEvents.USERLEFT, { user: client.user.name, event: 'left' });
    client.leave(channelId);
  }

  @SubscribeMessage(ChatEvents.GROUPMESSAGE)
  async addMessage(client: CustomSocket, message: Message) {
    // message.from = new Types.ObjectId(client.user.id);
    message.timeSent = new Date();
    const messageTDO: CreateMessageDTO = {
      content: { text: message.content.text, type: ChatChannelType.PRIVATE },
      sender: new Types.ObjectId(client.user.id),
      to: new Types.ObjectId(message.to),
      status: MessageStatus.DELIVERED,
      channelId: new Types.ObjectId(message.chatId),
    };

    const senderMessage = {
      content: { text: message.content.text, type: ChatChannelType.PRIVATE },
      sender: { name: client.user.name, _id: client.user.id },
      status: MessageStatus.DELIVERED,
      chatId: new Types.ObjectId(message.chatId),
    }
    await this.messageService.saveMessage(messageTDO);
    this.server.in(message.chatId).emit(ChatEvents.MESSAGE, senderMessage);
  }

  @SubscribeMessage(ChatEvents.PRIVATEMESSAGE)
  async chatPrivately(client: CustomSocket, message: Message) {
    message.sender = client.user.id;
    const messageTDO: CreateDirectMessageDTO = {
      content: { text: message.content.text, type: ChatChannelType.PRIVATE },
      sender: new Types.ObjectId(client.user.id),
      receiver: new Types.ObjectId(message.to),
      status: MessageStatus.DELIVERED,
    };

    await this.directMessageService.create(messageTDO);
    const receiver = await this.getReceiver(message.to);
    if (receiver) {
      client.to(receiver).emit(ChatEvents.MESSAGE, message);
      client.emit(ChatEvents.MESSAGE, message)
    } else {
      // TODO: send push notification here
    }
  }

  private async getReceiver(id: string): Promise<string> {
    const client = (await this.server.in(id.toString()).fetchSockets())[0];

    return client ? client.id : '';
  }

  private async getConnectedUsers() {
    const connectedUsers = await this.server.fetchSockets();
    return connectedUsers.map((socketInstance) => socketInstance['user']);
  }
}
