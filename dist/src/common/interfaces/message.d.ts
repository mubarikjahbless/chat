import { Content } from "./content";
export interface Message {
    content: Content;
    sender: string;
    to: string;
    status: string;
    timeSent: Date;
    chatId: string;
}
