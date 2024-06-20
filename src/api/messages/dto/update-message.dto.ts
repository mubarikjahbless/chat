import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDTO } from './create-message.dto';


export class UpdateMessageDTO extends PartialType(CreateMessageDTO) {
 
}
