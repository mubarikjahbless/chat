import { CreateChannelDTO } from './create-channel.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateChannelDTO extends PartialType(CreateChannelDTO){
}
