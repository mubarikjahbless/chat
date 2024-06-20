import { Message, User } from ".";
export interface Channel {
    name: string;
    members: User[];
    type: string;
    messages: Message[];
}
