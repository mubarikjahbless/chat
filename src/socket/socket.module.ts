import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SocketService } from './services/socket.service';
import { SocketGateway } from './gateway/socket.gateway';
import { MessagesController } from '../api/messages/controllers/messages.controller';
import { AuthController } from '../api/auth/auth.controller';
import {
  MessageModel,
  MessageSchema,
  ChannelModel,
  ChannelSchema,
  UserModel,
  UserSchema,
  DirectMessageModel,
  DirectMessageSchema,
  ChannelMemberModel,
  ChannelMemberSchema,
} from '../common/models';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SocketAuthMiddleware } from '../common/middleware';
import { ApiResponseService } from '../common/utility/api-response.service';
import { MessageService } from '../api/messages/service/messages.service';
import { AuthService } from '../api/auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { ChannelService } from '../api/channels/services/channel.service';
import { ChannelsController } from '../api/channels/controller/channels.controller';
import { DirectMessagesService } from '../api/messages/service/direct-messages.service';
import { DirectMessagesController } from '../api/messages/controllers/direct-messages.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:false, load: [configuration]}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.host'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: MessageModel.name, schema: MessageSchema },
      { name: ChannelModel.name, schema: ChannelSchema },
      { name: UserModel.name, schema: UserSchema },
      { name: DirectMessageModel.name, schema: DirectMessageSchema },
      { name: ChannelMemberModel.name, schema: ChannelMemberSchema },
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
    ChannelService,
    MessageService,
    ApiResponseService,
    AuthService,
    DirectMessagesService,
  ],
  controllers: [ChannelsController, MessagesController, AuthController,DirectMessagesController],
})
export class SocketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SocketAuthMiddleware).forRoutes('/api');
  }
}
