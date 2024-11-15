"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResponseFormat = exports.STATUS_RESPONSE_FORMAT = void 0;
const common_1 = require("@nestjs/common");
exports.STATUS_RESPONSE_FORMAT = "STATUS_RESPONSE_FORMAT";
const StatusResponseFormat = (statusCode, message) => (0, common_1.SetMetadata)(exports.STATUS_RESPONSE_FORMAT, { statusCode, message });
exports.StatusResponseFormat = StatusResponseFormat;
//# sourceMappingURL=status-response-format.decorator.js.map