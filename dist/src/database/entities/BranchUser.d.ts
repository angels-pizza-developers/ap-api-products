import { Branch } from "./Branch";
import { User } from "./User";
export declare class BranchUser {
    branchUserId: string;
    userId: string;
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";
    name: string;
    email: string | null;
    mobileNumber: string | null;
    accessGranted: boolean | null;
    createdAt: Date;
    updatedAt: Date | null;
    active: boolean;
    branch: Branch;
    user: User;
}
