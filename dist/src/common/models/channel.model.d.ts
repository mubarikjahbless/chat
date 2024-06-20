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
import { UserModel } from './user.model';
import { Schema as MongooseSchema } from 'mongoose';
export declare class ChannelModel {
    name: string;
    created_by: UserModel;
    created_at: Date;
    is_private: boolean;
    is_deleted: boolean;
}
export declare const ChannelSchema: MongooseSchema<ChannelModel, import("mongoose").Model<ChannelModel, any, any, any, import("mongoose").Document<unknown, any, ChannelModel> & ChannelModel & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChannelModel, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ChannelModel>> & import("mongoose").FlatRecord<ChannelModel> & {
    _id: import("mongoose").Types.ObjectId;
}>;
