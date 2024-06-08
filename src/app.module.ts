import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import configuration from '../config/configuration';
import * as path from 'path';
import * as winston from 'winston';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/info/'),
          filename: 'info.log',
          level: 'info',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/error/'),
          filename: 'error.log',
          level: 'error',
        }),
      ],
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    SocketModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
