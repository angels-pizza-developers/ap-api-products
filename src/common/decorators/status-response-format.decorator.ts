// src/shared/decorators/status-response-format.decorator.ts
import { SetMetadata } from "@nestjs/common";

export const STATUS_RESPONSE_FORMAT = "STATUS_RESPONSE_FORMAT";
export const StatusResponseFormat = (statusCode: number, message: string) =>
  SetMetadata(STATUS_RESPONSE_FORMAT, { statusCode, message });
