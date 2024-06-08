import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SocketService } from './services/socket.service';
import { SocketGateway } from './gateway/socket.gateway';
import { MessagesController } from '../api/messages/controllers/messages.controller';
import { RoomsController } from '../api/rooms/controller/rooms.controller';
import { AuthController } from 'src/api/auth/auth.controller';
import {
  MessageModel,
  MessageSchema,
  RoomModel,
  RoomSchema,
  UserModel,
  UserSchema,
} from 'src/common/models';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from 'src/environment';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SocketAuthMiddleware } from '../common/middleware';
import { RoomService } from '../api/rooms/services/room.service';
import { ApiResponseService } from 'src/common/utility/api-response.service';
import { MessageService } from '../api/messages/service/messages.service';
import { AuthService } from '../api/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot(environment.MONGO_DB_URL || process.env.DB_URL, {}),
    MongooseModule.forFeature([
      { name: MessageModel.name, schema: MessageSchema },
      { name: RoomModel.name, schema: RoomSchema },
      { name: UserModel.name, schema: UserSchema },
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
    ]),
  ],
  providers: [
    SocketGateway,
    SocketService,
    RoomService,
    MessageService,
    ApiResponseService,
    AuthService,
  ],
  controllers: [RoomsController, MessagesController, AuthController],
})
export class SocketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SocketAuthMiddleware).forRoutes('/api');
  }
}
