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
import { ChannelMemberModel } from '../../../common/models';
import { CreateChannelMemberDto } from '../dto/create-channel-members.dto';
import { ApiResponseService } from 'src/common/utility/api-response.service';
export declare class ChannelMembersService {
    private channelMemberModel;
    private apiResponse;
    constructor(channelMemberModel: Model<ChannelMemberModel>, apiResponse: ApiResponseService);
    addMember(createChannelMemberDto: CreateChannelMemberDto): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    setAdmin(channelId: string, userId: string): Promise<ChannelMemberModel>;
    getChannelMembers(channelId: string): Promise<ChannelMemberModel[]>;
    getChannelAdmins(channelId: string): Promise<ChannelMemberModel[]>;
}
