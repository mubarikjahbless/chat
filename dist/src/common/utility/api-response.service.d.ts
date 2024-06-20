import { StatusCode } from '../enums/status-code.enum';
export declare class ApiResponseService {
    successResponse(message?: string): {
        status: StatusCode;
        message: string;
    };
    successResponseWithData(message: string, data: Record<string, any>): {
        status: StatusCode;
        message: string;
        data: Record<string, any>;
    };
    alreadyExistResponse(serverMsg: string, object: string): void;
    errorResponse(serverMsg: string, clientMsg: string): void;
    notFoundResponse(resource?: string): void;
    validationErrorWithData(clientMsg: string, data: Record<string, any>, serverMsg?: string): void;
    validationErrorOnly(clientMsg: string, serverMsg?: string): void;
    unauthorizedResponse(message?: string): void;
}
