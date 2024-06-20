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
exports.UserSchema = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let UserModel = class UserModel {
};
exports.UserModel = UserModel;
__decorate([
    (0, mongoose_2.Prop)({
        required: true,
        maxlength: 20,
        minlength: 5,
        unique: true,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "name", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", Boolean)
], UserModel.prototype, "loggedIn", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: [{ type: mongoose_1.Types.ObjectId, ref: 'message' }] }),
    __metadata("design:type", Array)
], UserModel.prototype, "messages", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: [{ type: mongoose_1.Types.ObjectId, ref: 'channel' }] }),
    __metadata("design:type", Array)
], UserModel.prototype, "joinedChannels", void 0);
exports.UserModel = UserModel = __decorate([
    (0, mongoose_2.Schema)()
], UserModel);
exports.UserSchema = mongoose_2.SchemaFactory.createForClass(UserModel);
//# sourceMappingURL=user.model.js.map