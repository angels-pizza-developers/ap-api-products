import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class RequestMetadataGuard implements CanActivate {
    private readonly requiredHeaders;
    constructor(requiredHeaders: string[]);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
