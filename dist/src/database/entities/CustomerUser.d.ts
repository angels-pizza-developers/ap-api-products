import { CustomerAddress } from "./CustomerAddress";
import { User } from "./User";
export declare class CustomerUser {
    customerUserId: string;
    userId: string;
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";
    firstName: string;
    middleName: string | null;
    lastName: string;
    birthdate: string | null;
    imageUrl: string | null;
    email: string | null;
    mobileNumber: string | null;
    mobileCountryCode: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    active: boolean;
    fullName: string | null;
    customerAddresses: CustomerAddress[];
    user: User;
}
