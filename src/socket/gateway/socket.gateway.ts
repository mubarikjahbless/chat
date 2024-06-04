import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ObjectId, Schema } from 'mongoose';
import { CustomSocket } from '../../common/adapters/auth.adapter';
import { MessageModel, RoomModel, UserModel } from '../../common/models';
import { ChatEvents } from 'src/common/enums/chat-events';
import { Message } from '../../common/types/message'
import { MessageService } from 'src/api/messages/service/messages.service';
import { CreateMessageDTO } from 'src/api/messages/dto/create-message.dto';
import { ChatRoomType } from 'src/common/enums/chat-room-type';
import { MessageStatus } from '../../common/enums/message-status'
  ;

const port = 5000

@WebSocketGateway(port, {
  cors: {
    methods: ['GET', 'POST'],
    allowedHeaders: 'Content-Type, x-requested-with',
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(@InjectModel(MessageModel.name) private readonly messagesModel: Model<MessageModel>,
    @InjectModel(RoomModel.name) private readonly roomsModel: Model<RoomModel>,
    @InjectModel(UserModel.name) private readonly usersModel: Model<UserModel>,
    private readonly messageService: MessageService) {
  }


  @WebSocketServer()
  server: Server;

  async handleConnection(client: CustomSocket, ...args: any[]) {
    client.join(client.user.id.toString())
    this.getConnectedUsers()
    this.server.emit(ChatEvents.USERCONNECTED, await this.getConnectedUsers());

  }

  async handleDisconnect(client: CustomSocket) {
    this.server.emit(ChatEvents.USERLEFT, { user: client.user.name, event: 'left' });
  }

  @SubscribeMessage(ChatEvents.ENTERCHATROOM)
  async enterChatRoom(client: CustomSocket, roomId: string) {
    client.join(roomId);
    client.broadcast.to(roomId).emit(ChatEvents.USERJOIN, { user: client.user.name, event: 'joined' });
  }

  @SubscribeMessage(ChatEvents.LEAVECHATROOM)
  async leaveChatRoom(client: CustomSocket, roomId: string) {
    client.broadcast.to(roomId).emit(ChatEvents.USERLEFT, { user: client.user.name, event: 'left' });
    client.leave(roomId);
  }

  @SubscribeMessage(ChatEvents.ADDMESSAGE)
  async addMessage(client: CustomSocket, message: Message) {

    message.from = client.user.id;
    message.timeSent = new Date();
    await this.messagesModel.create(message);
    this.server.in(message.room).emit(ChatEvents.MESSAGE, message);
  }

  @SubscribeMessage(ChatEvents.PRIVATECHAT)
  async chatPrivately(client: CustomSocket, message: Message) {
    message.from = client.user.id
    message.room = client.user.id
    const messageTDO: CreateMessageDTO = {
      content: { text: message.content.text, type: ChatRoomType.PRIVATE },
      from: new Types.ObjectId(client.user.id),
      to: new Types.ObjectId(message.to),
      status: MessageStatus.DELIVERED,
      room: new Types.ObjectId(client.user.id)
    }
    await this.messageService.saveMessage(messageTDO)

    const receiver = await this.getReceiver(message.to)
    if (receiver) {
      client.to(receiver).emit(ChatEvents.MESSAGE, message)
    } else {
      // TODO: send push notification here
    }
  }

  private async getReceiver(id: string): Promise<string> {
    const client = (await this.server.in(id.toString()).fetchSockets())[0];

    return client ? client.id : ''
  }

  private async getConnectedUsers() {
    const connectedUsers = await this.server.fetchSockets();
    return connectedUsers.map((socketInstance) => socketInstance['user'])
  }
}