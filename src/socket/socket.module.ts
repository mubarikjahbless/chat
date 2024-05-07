import {MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SocketService } from './services/socket.service';
import { SocketGateway } from './gateway/socket.gateway';
import { MessagesController } from 'src/api/messages/messages.controller';
import { RoomsController } from '../api/rooms/rooms.controller';
import { AuthController } from 'src/api/auth/auth.controller';
import { Message, MessageSchema, Room, RoomSchema, User, UserSchema } from 'src/common/models';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from 'src/environment';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SocketAuthMiddleware } from '../common/middleware';


@Module({
  imports:[MongooseModule.forRoot(environment.MONGO_DB_URL || process.env.DB_URL, {}),
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ])
  ],
  providers: [SocketGateway, SocketService],
  controllers:[
    RoomsController,
    MessagesController,
    AuthController,    

  ]
})
export class SocketModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
  consumer.apply(SocketAuthMiddleware)
  .forRoutes('/api');
  }
}
