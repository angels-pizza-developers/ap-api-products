import { MobileNumberDto } from "./mobile.dto";
import { CreateUserDto } from "./user.create.dto";
export declare class CreateCorporateUserDto extends CreateUserDto {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    mobileDetails: MobileNumberDto;
}
