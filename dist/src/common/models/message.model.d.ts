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
import { Types, Schema as MongooseSchema } from 'mongoose';
import { BaseSchema } from './base.model';
import { UserModel } from './user.model';
import { Content } from '../interfaces';
import { ChannelModel } from './channel.model';
export type ContentType = 'text' | 'file' | 'emoji';
export declare class MessageModel extends BaseSchema {
    channelId: ChannelModel;
    sender: UserModel;
    content: Content;
    timestamp: Date;
}
export declare const MessageSchema: MongooseSchema<MessageModel, import("mongoose").Model<MessageModel, any, any, any, import("mongoose").Document<unknown, any, MessageModel> & MessageModel & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MessageModel, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<MessageModel>> & import("mongoose").FlatRecord<MessageModel> & Required<{
    _id: Types.ObjectId;
}>>;
