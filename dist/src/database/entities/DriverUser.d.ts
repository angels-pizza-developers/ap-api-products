import { User } from "./User";
export declare class DriverUser {
    driverUserId: string;
    userId: string;
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";
    name: string;
    email: string | null;
    mobileNumber: string | null;
    accessGranted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    active: boolean;
    user: User;
}
