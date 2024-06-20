import { ChannelMemberModel } from '../../../common/models';
import { CreateChannelMemberDto } from '../dto/create-channel-members.dto';
import { ChannelMembersService } from '../services/channel-members.service';
export declare class ChannelMembersController {
    private readonly channelMembersService;
    constructor(channelMembersService: ChannelMembersService);
    addMember(createChannelMemberDto: CreateChannelMemberDto): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    setAdmin(channelId: string, userId: string): Promise<ChannelMemberModel>;
    getMembers(channelId: string): Promise<ChannelMemberModel[]>;
    getAdmins(channelId: string): Promise<ChannelMemberModel[]>;
}
