"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = void 0;
const common_1 = require("@nestjs/common");
const socket_service_1 = require("./services/socket.service");
const socket_gateway_1 = require("./gateway/socket.gateway");
const messages_controller_1 = require("../api/messages/controllers/messages.controller");
const auth_controller_1 = require("../api/auth/auth.controller");
const models_1 = require("../common/models");
const mongoose_1 = require("@nestjs/mongoose");
const microservices_1 = require("@nestjs/microservices");
const middleware_1 = require("../common/middleware");
const api_response_service_1 = require("../common/utility/api-response.service");
const messages_service_1 = require("../api/messages/service/messages.service");
const auth_service_1 = require("../api/auth/auth.service");
const config_1 = require("@nestjs/config");
const configuration_1 = __importDefault(require("../../config/configuration"));
const channel_service_1 = require("../api/channels/services/channel.service");
const channels_controller_1 = require("../api/channels/controller/channels.controller");
const direct_messages_service_1 = require("../api/messages/service/direct-messages.service");
const direct_messages_controller_1 = require("../api/messages/controllers/direct-messages.controller");
let SocketModule = class SocketModule {
    configure(consumer) {
        consumer.apply(middleware_1.SocketAuthMiddleware).forRoutes('/api');
    }
};
exports.SocketModule = SocketModule;
exports.SocketModule = SocketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: false, load: [configuration_1.default] }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    uri: configService.get('database.host'),
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: models_1.MessageModel.name, schema: models_1.MessageSchema },
                { name: models_1.ChannelModel.name, schema: models_1.ChannelSchema },
                { name: models_1.UserModel.name, schema: models_1.UserSchema },
                { name: models_1.DirectMessageModel.name, schema: models_1.DirectMessageSchema },
                { name: models_1.ChannelMemberModel.name, schema: models_1.ChannelMemberSchema },
            ]),
            microservices_1.ClientsModule.register([
                {
                    name: 'CHAT_SERVICE',
                    transport: microservices_1.Transport.REDIS,
                    options: {
                        host: 'localhost',
                        port: 6379,
                    },
                },
            ]),
        ],
        providers: [
            socket_gateway_1.SocketGateway,
            socket_service_1.SocketService,
            channel_service_1.ChannelService,
            messages_service_1.MessageService,
            api_response_service_1.ApiResponseService,
            auth_service_1.AuthService,
            direct_messages_service_1.DirectMessagesService,
        ],
        controllers: [channels_controller_1.ChannelsController, messages_controller_1.MessagesController, auth_controller_1.AuthController, direct_messages_controller_1.DirectMessagesController],
    })
], SocketModule);
//# sourceMappingURL=socket.module.js.map