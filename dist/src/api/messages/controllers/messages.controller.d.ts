import { MessageService } from '../service/messages.service';
import { CreateMessageDTO } from '../dto/create-message.dto';
export declare class MessagesController {
    private readonly messageService;
    constructor(messageService: MessageService);
    find(chatId: string): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    getDirectChatMessages(where: any): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    getAllMessages(): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    createMessage(data: CreateMessageDTO): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    deleteMessage(id: string): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
    }>;
}
