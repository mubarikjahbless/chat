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
import { Types } from "mongoose";
import { BaseSchema } from "./base.model";
import { UserModel } from "./user.model";
export declare class UserSettingsModel extends BaseSchema {
    user: UserModel;
    notification_preferences: string[];
    chat_theme?: string;
}
export declare const UserSettingsSchema: import("mongoose").Schema<UserSettingsModel, import("mongoose").Model<UserSettingsModel, any, any, any, import("mongoose").Document<unknown, any, UserSettingsModel> & UserSettingsModel & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserSettingsModel, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserSettingsModel>> & import("mongoose").FlatRecord<UserSettingsModel> & Required<{
    _id: Types.ObjectId;
}>>;
