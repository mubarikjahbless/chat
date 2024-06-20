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
exports.NotificationSchema = exports.NotificationModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
let NotificationModel = class NotificationModel extends base_model_1.BaseSchema {
};
exports.NotificationModel = NotificationModel;
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'User' }] }),
    __metadata("design:type", user_model_1.UserModel)
], NotificationModel.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NotificationModel.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Object)
], NotificationModel.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], NotificationModel.prototype, "timestamp", void 0);
exports.NotificationModel = NotificationModel = __decorate([
    (0, mongoose_1.Schema)()
], NotificationModel);
exports.NotificationSchema = mongoose_1.SchemaFactory.createForClass(NotificationModel);
//# sourceMappingURL=notifications.model.js.map