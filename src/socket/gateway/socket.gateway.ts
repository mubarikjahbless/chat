import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomSocket } from '../../common/adapters/auth.adapter';
import { Message, Room, User } from '../../common/models';

const port = 5000

@WebSocketGateway(port,{cors:{
  methods: ['GET', 'POST'],
  allowedHeaders: 'Content-Type, x-requested-with',
  credentials: true,
},})
export class SocketGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(@InjectModel(Message.name) private readonly messagesModel: Model<Message>,
  @InjectModel(Room.name) private readonly roomsModel: Model<Room>,
  @InjectModel(User.name) private readonly usersModel: Model<User>) {
}


@WebSocketServer()
server: Server;

  async handleConnection(client: CustomSocket, ...args: any[]) {
  client.join(client.user._id.toString())
this.getConnectedUsers()
  this.server.emit("user-connected", await this.getConnectedUsers());
  
}
async handleDisconnect(client: CustomSocket) {
this.server.emit('users-changed', {user: client.user.nickname, event: 'left'});
}

@SubscribeMessage('enter-chat-room') 
async enterChatRoom(client: CustomSocket, roomId: string) {
client.join(roomId);
client.broadcast.to(roomId).emit('users-changed', {user: client.user.nickname, event: 'joined'});
}

@SubscribeMessage('leave-chat-room')
async leaveChatRoom(client: CustomSocket, roomId: string) {
client.broadcast.to(roomId).emit('users-changed', {user: client.user.nickname, event: 'left'});
client.leave(roomId);
}

@SubscribeMessage('add-message')
async addMessage(client: CustomSocket, message: Message) {
message.owner = client.user._id;
message.created = new Date();
message = await this.messagesModel.create(message);
message.owner = {_id: client.user._id, nickname: client.user.nickname} as User;
this.server.in(message.room as string).emit('message', message);
}

@SubscribeMessage('private-message')
async chatPrivately(client: CustomSocket, content:any){
const sender = await this.getSender(content.to)

 if(sender){
   client.to(sender).emit('private-message',{text:content.content, from:{id:client.user._id, name:client.user.nickname}})
 }else{
  // TODO: send push notification here
 }
}

private async getSender(id:string):Promise<string>{
   const client  = (await this.server.in(id.toString()).fetchSockets())[0];
   
   return client?client.id:''
}

private async getConnectedUsers(){
  const connectedUsers = await this.server.fetchSockets();
return connectedUsers.map((socketInstance)=>socketInstance['user'])
}
}