import { CreateChannelMemberDto } from './create-channel-members.dto';
import { PartialType } from '@nestjs/mapped-types';


export class UpdateChannelMemberDto extends PartialType(CreateChannelMemberDto) {}
