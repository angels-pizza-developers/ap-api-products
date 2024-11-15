import { ExecutionContext } from "@nestjs/common";
declare const FacebookAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class FacebookAuthGuard extends FacebookAuthGuard_base {
    constructor();
    handleRequest(err: any, user: any, info: any, context: ExecutionContext): any;
}
export {};
