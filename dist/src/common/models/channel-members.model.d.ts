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
import { BaseSchema } from "./base.model";
import { Schema as MongooseSchema } from 'mongoose';
import { ChannelModel } from "./channel.model";
import { UserModel } from "./user.model";
export declare class ChannelMemberModel extends BaseSchema {
    channel: ChannelModel;
    user: UserModel;
    joined_at: Date;
    is_admin: boolean;
}
export declare const ChannelMemberSchema: MongooseSchema<ChannelMemberModel, import("mongoose").Model<ChannelMemberModel, any, any, any, import("mongoose").Document<unknown, any, ChannelMemberModel> & ChannelMemberModel & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChannelMemberModel, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ChannelMemberModel>> & import("mongoose").FlatRecord<ChannelMemberModel> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
