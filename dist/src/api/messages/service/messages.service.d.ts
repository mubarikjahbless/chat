/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from 'mongoose';
import { MessageModel } from '../../../common/models';
import { ApiResponseService } from '../../../common/utility/api-response.service';
import { CreateMessageDTO } from '../dto/create-message.dto';
export declare class MessageService {
    private readonly messageModel;
    private readonly apiResponseService;
    constructor(messageModel: Model<MessageModel>, apiResponseService: ApiResponseService);
    getMessages(channelId: string): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    getDirectChatMessages(where: any): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    getallMessages(): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    saveMessage(message: CreateMessageDTO): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    updateMessage(data: any): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
    }>;
    deleteMessage(id: string): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
    }>;
}
