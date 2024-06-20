"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChannelMemberDto = void 0;
const create_channel_members_dto_1 = require("./create-channel-members.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateChannelMemberDto extends (0, mapped_types_1.PartialType)(create_channel_members_dto_1.CreateChannelMemberDto) {
}
exports.UpdateChannelMemberDto = UpdateChannelMemberDto;
//# sourceMappingURL=update-channel-members.dto.js.map