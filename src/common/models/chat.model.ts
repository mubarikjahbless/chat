import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema } from "./base.model";

@Schema()
export class User extends BaseSchema{

    @Prop({ unique: true })
    username: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ nullable: true })
    profile_picture?: string;

    @Prop({ nullable: true })
    status?: string;
}

@Schema()
export class Conversation extends BaseSchema{
    
    @Prop()
    type: 'individual' | 'group';

    @Prop({ nullable: true })
    group_name?: string;

    @Prop({ nullable: true })
    creator_id?: string;
}

@Schema()
export class Participant extends BaseSchema {
    
    @Prop({type: [{type: Types.ObjectId, ref: 'Conversation'}]})
    conversation: Types.ObjectId;

    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    user: Types.ObjectId;

    @Prop({ nullable: true })
    role?: 'admin' | 'member';
}

@Schema()
export class Message extends BaseSchema{
    
    @Prop({type: [{type: Types.ObjectId, ref: 'Conversation'}]})
    conversation: Types.ObjectId;

    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    sender: Types.ObjectId;

    @Prop()
    content: string;

    @Prop({ type: 'timestamp' })
    timestamp: Date;

    @Prop({ nullable: true })
    file_url?: string;
}

@Schema()
export class MessageStatus extends BaseSchema {
    
    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    message: Types.ObjectId;

    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    user: Types.ObjectId;

    @Prop()
    status: 'delivered' | 'read';

    @Prop({ type: 'timestamp' })
    timestamp: Date;
}

@Schema()
export class BlockedUser extends BaseSchema {
    
    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    user: Types.ObjectId;

    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    blocked_user: Types.ObjectId;
}

@Schema()
export class Notification extends BaseSchema{
    
    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    user: Types.ObjectId;

    @Prop()
    type: string;

    @Prop()
    content: string;

    @Prop({ type: 'timestamp' })
    timestamp: Date;
}

@Schema()
export class UserSettings extends BaseSchema{

    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    user: Types.ObjectId;

    @Prop({required:true})
    notification_preferences: string[];

    @Prop({ nullable: true })
    chat_theme?: string;
}

@Schema()
export class GroupParticipant extends BaseSchema{
    
    @Prop({type: [{type: Types.ObjectId, ref: 'Conversation'}]})
    conversation: Types.ObjectId;

    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    participant: Types.ObjectId;

    @Prop()
    role: 'admin' | 'member';
}

@Schema()
export class Metadata extends BaseSchema{
    
    @Prop({type: [{type: Types.ObjectId, ref: 'Conversation'}]})
    conversation: Types.ObjectId;

    @Prop()
    key: string;

    @Prop()
    value: string;
}
