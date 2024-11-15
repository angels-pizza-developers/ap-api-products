import { MobileNumberDto } from "./mobile.dto";
export declare class CreateUserDto {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    mobileDetails: MobileNumberDto;
    password: string;
}
