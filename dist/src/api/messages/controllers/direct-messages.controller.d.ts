import { CreateDirectMessageDTO } from '../dto/create-direct-message.dto';
import { DirectMessagesService } from '../service/direct-messages.service';
export declare class DirectMessagesController {
    private readonly directMessagesService;
    constructor(directMessagesService: DirectMessagesService);
    create(createDirectMessageDto: CreateDirectMessageDTO): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    findAll(): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    findById(params: {
        sender: string;
        receiver: string;
    }): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    findByUser(userId: string): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
}
