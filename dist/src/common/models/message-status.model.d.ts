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
import { BaseSchema, MessageModel, UserModel } from ".";
import { Types } from "mongoose";
export declare class MessageStatusModel extends BaseSchema {
    message: MessageModel;
    user: UserModel;
    status: 'delivered' | 'read';
    timestamp: Date;
}
export declare const MessageStatusSchema: import("mongoose").Schema<MessageStatusModel, import("mongoose").Model<MessageStatusModel, any, any, any, import("mongoose").Document<unknown, any, MessageStatusModel> & MessageStatusModel & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MessageStatusModel, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<MessageStatusModel>> & import("mongoose").FlatRecord<MessageStatusModel> & Required<{
    _id: Types.ObjectId;
}>>;
