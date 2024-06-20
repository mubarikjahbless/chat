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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockedUserSchema = exports.BlockedUserModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const _1 = require(".");
const mongoose_2 = require("mongoose");
let BlockedUserModel = class BlockedUserModel extends _1.BaseSchema {
};
exports.BlockedUserModel = BlockedUserModel;
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'User' }] }),
    __metadata("design:type", _1.UserModel)
], BlockedUserModel.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'User' }] }),
    __metadata("design:type", _1.UserModel)
], BlockedUserModel.prototype, "blocked_user", void 0);
exports.BlockedUserModel = BlockedUserModel = __decorate([
    (0, mongoose_1.Schema)()
], BlockedUserModel);
exports.BlockedUserSchema = mongoose_1.SchemaFactory.createForClass(BlockedUserModel);
//# sourceMappingURL=blocked-users.model.js.map