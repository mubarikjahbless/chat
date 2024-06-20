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
import { BaseSchema, UserModel } from ".";
import { Types } from "mongoose";
export declare class BlockedUserModel extends BaseSchema {
    user: UserModel;
    blocked_user: UserModel;
}
export declare const BlockedUserSchema: import("mongoose").Schema<BlockedUserModel, import("mongoose").Model<BlockedUserModel, any, any, any, import("mongoose").Document<unknown, any, BlockedUserModel> & BlockedUserModel & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BlockedUserModel, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<BlockedUserModel>> & import("mongoose").FlatRecord<BlockedUserModel> & Required<{
    _id: Types.ObjectId;
}>>;
