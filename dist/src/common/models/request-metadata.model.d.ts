import { USER_ROLE } from "src/shared/constants/user-role.constant";
export declare class RequestMetadataModel {
    readonly userId: string;
    readonly ipAddress: string;
    readonly "user-agent": string;
    readonly referer?: string;
    readonly timezone?: string;
    readonly role?: USER_ROLE;
    [key: string]: any;
    constructor(partial: Partial<RequestMetadataModel>);
}
