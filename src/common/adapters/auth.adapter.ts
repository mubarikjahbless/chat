import { IoAdapter } from '@nestjs/platform-socket.io';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { User } from '../models/user.model';

export interface CustomSocket extends Socket {
  user: User;
}

export class AuthAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, {...options, cors: true});
    server.use((socket: CustomSocket, next) => { 
      if (socket.handshake?.query?.token) {        
        verify(socket.handshake.query.token as string, process.env.JWT_ACCESS_KEY, (err, decoded) => {
          if (err) {
            next(new Error('Authentication error'));
          } else {
            socket.user = decoded as User;
            next();
          }
        });
      } else {
        next(new Error('Authentication error'));
      }
    });
    return server;
  }
}
