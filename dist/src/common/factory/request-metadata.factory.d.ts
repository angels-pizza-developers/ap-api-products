import { Type, CanActivate } from "@nestjs/common";
export declare function RequestMetadataGuardFactory(...requiredHeaders: string[]): Type<CanActivate>;
