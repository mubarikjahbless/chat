import { Socket } from 'socket.io';
import { RedisContext } from '@nestjs/microservices';
export declare class SocketService {
    private readonly connectedClients;
    handleConnection(socket: Socket): void;
    getNotifications(data: number[], context: RedisContext): void;
}
