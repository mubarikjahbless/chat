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
exports.MessageSchema = exports.MessageModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
const channel_model_1 = require("./channel.model");
let MessageModel = class MessageModel extends base_model_1.BaseSchema {
};
exports.MessageModel = MessageModel;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Channel' }),
    __metadata("design:type", channel_model_1.ChannelModel)
], MessageModel.prototype, "channelId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_model_1.UserModel)
], MessageModel.prototype, "sender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], MessageModel.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], MessageModel.prototype, "timestamp", void 0);
exports.MessageModel = MessageModel = __decorate([
    (0, mongoose_1.Schema)()
], MessageModel);
exports.MessageSchema = mongoose_1.SchemaFactory.createForClass(MessageModel);
//# sourceMappingURL=message.model.js.map