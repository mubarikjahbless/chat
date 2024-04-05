import { Module } from '@nestjs/common';
import { SocketService } from './services/socket.service';
import { SocketGateway } from './gateway/socket.gateway';


@Module({
  providers: [SocketGateway, SocketService]
})
export class SocketModule {}
