import { User } from "./User";
export declare class CorporateUser {
    corporateUserId: string;
    userId: string;
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";
    name: string;
    email: string | null;
    mobileNumber: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    accessGranted: boolean;
    active: boolean;
    user: User;
}
