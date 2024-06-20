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
import { User } from '../../common/interfaces';
import { UserModel } from '../../common/models';
import { Model } from 'mongoose';
import { ApiResponseService } from '../../common/utility/api-response.service';
export declare class AuthService {
    private readonly userModel;
    private readonly apiResponseService;
    constructor(userModel: Model<UserModel>, apiResponseService: ApiResponseService);
    createUser(user: User): Promise<void | {
        status: import("../../common/enums/status-code.enum").StatusCode;
        message: string;
    }>;
    login(user: User): Promise<void | {
        status: import("../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    logout(user: User): Promise<void | {
        status: import("../../common/enums/status-code.enum").StatusCode;
        message: string;
    }>;
    getUsers(): Promise<void | {
        status: import("../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
}
