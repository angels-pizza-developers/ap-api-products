import { ExecutionContext } from "@nestjs/common";
declare const GoogleAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogleAuthGuard extends GoogleAuthGuard_base {
    constructor();
    handleRequest(err: any, user: any, info: any, context: ExecutionContext): any;
}
export {};
