"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDirectMessageDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_direct_message_dto_1 = require("./create-direct-message.dto");
class UpdateDirectMessageDTO extends (0, mapped_types_1.PartialType)(create_direct_message_dto_1.CreateDirectMessageDTO) {
}
exports.UpdateDirectMessageDTO = UpdateDirectMessageDTO;
//# sourceMappingURL=update-direct-message.dto.js.map