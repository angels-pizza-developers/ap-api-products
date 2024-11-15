"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMetadata = void 0;
const common_1 = require("@nestjs/common");
const request_metadata_model_1 = require("../models/request-metadata.model");
const moment = __importStar(require("moment-timezone"));
const request_metadata_error_constant_1 = require("../../shared/constants/request-metadata-error.constant");
exports.RequestMetadata = (0, common_1.createParamDecorator)((data = [], ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.user?.id;
    const ipAddress = request.ip || request.connection.remoteAddress;
    const geolocationRegex = /^-?\d{1,3}(\.\d+)?\s*,\s*-?\d{1,3}(\.\d+)?$/;
    if (data.includes("geolocation") &&
        (!request.headers["geolocation"] ||
            !geolocationRegex.test(request.headers["geolocation"]))) {
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: "Invalid geolocation format.",
            message: request_metadata_error_constant_1.GEOLOCATION_INVALID_FORMAT,
            errorCode: Object.keys(request_metadata_error_constant_1.GEOLOCATION_INVALID_FORMAT)[0],
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+(?:\/[A-Za-z_]+)?$/;
    if (data.includes("timezone") &&
        (!request.headers["timezone"] ||
            !timezoneRegex.test(request.headers["timezone"]))) {
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: "Invalid timezone format.",
            message: request_metadata_error_constant_1.TIMEZONE_INVALID_FORMAT,
            errorCode: Object.keys(request_metadata_error_constant_1.TIMEZONE_INVALID_FORMAT)[0],
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    if (data.includes("timezone") &&
        !moment.tz.zone(request.headers["timezone"])) {
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: "Invalid timezone.",
            message: request_metadata_error_constant_1.TIMEZONE_INVALID_FORMAT,
            errorCode: Object.keys(request_metadata_error_constant_1.TIMEZONE_INVALID_FORMAT)[0],
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    const additionalHeaders = {};
    if (data && data.length > 0) {
        data.forEach((header) => {
            additionalHeaders[header] = request.headers[header.toLowerCase()];
        });
    }
    return new request_metadata_model_1.RequestMetadataModel({
        userId,
        ipAddress,
        ...additionalHeaders,
    });
});
//# sourceMappingURL=request-metadata.decorator.js.map