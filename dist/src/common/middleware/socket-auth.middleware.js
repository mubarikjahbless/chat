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
exports.SocketAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const express_jwt_1 = require("express-jwt");
const mongoose_2 = require("mongoose");
const models_1 = require("../models");
let SocketAuthMiddleware = class SocketAuthMiddleware {
    constructor(userModel) {
        this.userModel = userModel;
    }
    use(req, res, next) {
        (0, express_jwt_1.expressjwt)({
            secret: process.env.JWT_ACCESS_KEY,
            algorithms: ['HS256'],
            isRevoked: async (_, token) => {
                const payload = token === null || token === void 0 ? void 0 : token.payload;
                if (!payload) {
                    throw new common_1.UnauthorizedException('The token contains invalid credentials or has expired');
                }
                const user = await this.userModel.findById(payload._id).exec();
                if (!user || !user.loggedIn)
                    throw new common_1.UnauthorizedException('The user has been logged out');
                return false;
            },
        }).unless({ path: ['/api/auth/login', '/api/auth/sign-up'] })(req, res, next);
    }
};
exports.SocketAuthMiddleware = SocketAuthMiddleware;
exports.SocketAuthMiddleware = SocketAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.UserModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SocketAuthMiddleware);
//# sourceMappingURL=socket-auth.middleware.js.map