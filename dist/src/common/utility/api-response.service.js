"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseService = void 0;
const common_1 = require("@nestjs/common");
const status_code_enum_1 = require("../enums/status-code.enum");
let ApiResponseService = class ApiResponseService {
    successResponse(message = 'successful') {
        return {
            status: status_code_enum_1.StatusCode.SUCCESS,
            message,
        };
    }
    successResponseWithData(message, data) {
        return {
            status: status_code_enum_1.StatusCode.SUCCESS,
            message,
            data,
        };
    }
    alreadyExistResponse(serverMsg, object) {
        throw new common_1.BadRequestException({
            statusCode: status_code_enum_1.StatusCode.FAILURE,
            message: {
                serverMsg,
                clientMsg: `${object} already exists`,
            },
        });
    }
    errorResponse(serverMsg, clientMsg) {
        throw new common_1.BadRequestException({
            statusCode: status_code_enum_1.StatusCode.FAILURE,
            message: {
                serverMsg,
                clientMsg,
            },
        });
    }
    notFoundResponse(resource = 'Not found') {
        throw new common_1.NotFoundException({
            status: status_code_enum_1.StatusCode.FAILURE,
            message: resource,
        });
    }
    validationErrorWithData(clientMsg, data, serverMsg = 'Validation error') {
        throw new common_1.BadRequestException({
            statusCode: status_code_enum_1.StatusCode.FAILURE,
            message: {
                serverMsg,
                clientMsg,
            },
            data,
        });
    }
    validationErrorOnly(clientMsg, serverMsg = 'Validation error') {
        throw new common_1.BadRequestException({
            statusCode: status_code_enum_1.StatusCode.FAILURE,
            message: {
                clientMsg,
                serverMsg,
            },
        });
    }
    unauthorizedResponse(message = 'Unauthorized Access') {
        throw new common_1.ForbiddenException({
            statusCode: status_code_enum_1.StatusCode.UNAUTHORIZED,
            message,
        });
    }
};
exports.ApiResponseService = ApiResponseService;
exports.ApiResponseService = ApiResponseService = __decorate([
    (0, common_1.Injectable)()
], ApiResponseService);
//# sourceMappingURL=api-response.service.js.map