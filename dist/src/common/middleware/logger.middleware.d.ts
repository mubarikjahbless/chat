import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';
export declare class LoggerMiddleware implements NestMiddleware {
    private readonly logger;
    constructor(logger: Logger);
    use(request: Request, response: Response, next: NextFunction): Promise<void>;
}
