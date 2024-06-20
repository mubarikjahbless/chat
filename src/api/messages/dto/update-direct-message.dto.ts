import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectMessageDTO } from './create-direct-message.dto';


export class UpdateDirectMessageDTO extends PartialType(CreateDirectMessageDTO) {
 
}