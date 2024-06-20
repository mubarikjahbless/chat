import { IoAdapter } from '@nestjs/platform-socket.io';
import { Socket } from 'socket.io';
import { User } from '../interfaces';
export interface CustomSocket extends Socket {
    user: User;
}
export declare class AuthAdapter extends IoAdapter {
    createIOServer(port: number, options?: any): any;
}
