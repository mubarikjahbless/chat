"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const models_1 = require("../../common/models");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const api_response_service_1 = require("../../common/utility/api-response.service");
const jwt_helper_1 = require("../../common/helpers/jwt.helper");
let AuthService = class AuthService {
    constructor(userModel, apiResponseService) {
        this.userModel = userModel;
        this.apiResponseService = apiResponseService;
    }
    async createUser(user) {
        try {
            user.password = await (0, bcrypt_1.hash)(user.password, 10);
            await this.userModel.create(user);
            return this.apiResponseService.successResponse();
        }
        catch (error) {
            return this.apiResponseService.errorResponse(JSON.stringify(error), 'We encounter an error whiles signing up user, kindly try again later');
        }
    }
    async login(user) {
        const result = await this.userModel.findOne({ name: user.name }).exec();
        if (result) {
            const isMatch = await (0, bcrypt_1.compare)(user.password, result.password);
            if (isMatch) {
                result.loggedIn = true;
                await result.save();
                return this.apiResponseService.successResponseWithData('successful', (0, jwt_helper_1.loginPayload)({
                    id: result._id.toString(),
                    name: result.name,
                }));
            }
        }
        return this.apiResponseService.unauthorizedResponse('Incorrect user name or password');
    }
    async logout(user) {
        try {
            await this.userModel.findByIdAndUpdate(user.id, { loggedIn: false });
            return this.apiResponseService.successResponse();
        }
        catch (error) {
            return this.apiResponseService.errorResponse(JSON.stringify(error), 'failed to logout');
        }
    }
    async getUsers() {
        try {
            const result = await this.userModel.find().select('_id name').exec();
            return this.apiResponseService.successResponseWithData('successul', result);
        }
        catch (error) {
            return this.apiResponseService.errorResponse(JSON.stringify(error), 'server error');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.UserModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        api_response_service_1.ApiResponseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map