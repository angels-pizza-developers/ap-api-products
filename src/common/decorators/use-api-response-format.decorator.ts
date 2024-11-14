// src/shared/decorators/use-api-response-format.decorator.ts
import { SetMetadata } from "@nestjs/common";

export const USE_API_RESPONSE_FORMAT = "USE_API_RESPONSE_FORMAT";
export const UseApiResponseFormat = (defaultMessage?: string) =>
  SetMetadata(USE_API_RESPONSE_FORMAT, { defaultMessage });
