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
exports.ChannelMemberSchema = exports.ChannelMemberModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_model_1 = require("./base.model");
const mongoose_2 = require("mongoose");
const channel_model_1 = require("./channel.model");
const user_model_1 = require("./user.model");
let ChannelMemberModel = class ChannelMemberModel extends base_model_1.BaseSchema {
};
exports.ChannelMemberModel = ChannelMemberModel;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Channel' }),
    __metadata("design:type", channel_model_1.ChannelModel)
], ChannelMemberModel.prototype, "channel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_model_1.UserModel)
], ChannelMemberModel.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], ChannelMemberModel.prototype, "joined_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ChannelMemberModel.prototype, "is_admin", void 0);
exports.ChannelMemberModel = ChannelMemberModel = __decorate([
    (0, mongoose_1.Schema)()
], ChannelMemberModel);
exports.ChannelMemberSchema = mongoose_1.SchemaFactory.createForClass(ChannelMemberModel);
//# sourceMappingURL=channel-members.model.js.map