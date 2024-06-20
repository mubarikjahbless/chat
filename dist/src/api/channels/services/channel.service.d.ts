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
import { ChannelModel } from '../../../common/models';
import { ApiResponseService } from '../../../common/utility/api-response.service';
import { CreateChannelDTO } from '../dto/create-channel.dto';
import { UpdateChannelDTO } from '../dto/update-channel.dto';
export declare class ChannelService {
    private readonly model;
    private readonly apiResponseService;
    constructor(model: Model<ChannelModel>, apiResponseService: ApiResponseService);
    getChannels(): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    searchChannel(searchKey: string): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    getChannelById(channelId: string): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    joinChannel(data: any, id: string): void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
    };
    createChannel(data: CreateChannelDTO): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    updateChannelInfo(channel: UpdateChannelDTO, id: string): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    deleteChannel(id: string): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
    }>;
}
