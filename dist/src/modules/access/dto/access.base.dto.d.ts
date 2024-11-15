export declare class AccessPagesDto {
    page: string;
    view: boolean;
    modify: boolean;
    rights: string[];
    accessPermissions: any[];
}
export declare class BaseAccessDto {
    name: string;
    accessPages: AccessPagesDto[];
}
