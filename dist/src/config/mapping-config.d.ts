import { USER_ROLE } from "src/shared/constants/user-role.constant";
export declare const mappingConfig: {
    RegisterCustomerDtoToCreateUserDto: {
        username: (sourceValue: any, sourceObject: any) => any;
        role: (sourceValue: any, sourceObject: any) => USER_ROLE;
    };
    RegisterCorporateDtoToCreateUserDto: {
        username: (sourceValue: any, sourceObject: any) => any;
        role: (sourceValue: any, sourceObject: any) => USER_ROLE;
    };
};
