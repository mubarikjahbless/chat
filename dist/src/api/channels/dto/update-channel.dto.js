"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChannelDTO = void 0;
const create_channel_dto_1 = require("./create-channel.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateChannelDTO extends (0, mapped_types_1.PartialType)(create_channel_dto_1.CreateChannelDTO) {
}
exports.UpdateChannelDTO = UpdateChannelDTO;
//# sourceMappingURL=update-channel.dto.js.map