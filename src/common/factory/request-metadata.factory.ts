import { Type, Injectable, CanActivate } from "@nestjs/common";
import { RequestMetadataGuard } from "../guards/request-metadata.guard";

export function RequestMetadataGuardFactory(
  ...requiredHeaders: string[]
): Type<CanActivate> {
  @Injectable()
  class CustomRequestMetadataGuard extends RequestMetadataGuard {
    constructor() {
      super(requiredHeaders);
    }
  }

  return CustomRequestMetadataGuard;
}
