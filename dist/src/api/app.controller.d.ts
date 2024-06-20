import { Logger } from 'winston';
export declare class AppController {
    private readonly logger;
    constructor(logger: Logger);
    healthCheck(): {
        version: string;
    };
}
