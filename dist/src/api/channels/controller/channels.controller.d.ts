import { CreateChannelDTO } from '../dto/create-channel.dto';
import { UpdateChannelDTO } from '../dto/update-channel.dto';
import { ChannelService } from '../services/channel.service';
export declare class ChannelsController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    searchChannel(searchQuery: string): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    findChannelById(id: string): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    save(channel: CreateChannelDTO): Promise<{
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    joinGroup(data: any, id: string): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
    }>;
    updateChannel(channel: UpdateChannelDTO, id: string): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    deleteChannel(id: string): Promise<void | {
        status: import("../../../common/enums/status-code.enum").StatusCode;
        message: string;
    }>;
}
