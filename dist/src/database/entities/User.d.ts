import { BranchUser } from "./BranchUser";
import { CorporateUser } from "./CorporateUser";
import { CustomerUser } from "./CustomerUser";
import { DriverUser } from "./DriverUser";
import { Access } from "./Access";
import { UserAuth } from "./UserAuth";
export declare class User {
    userId: string;
    role: "CUSTOMER" | "CORPORATE" | "BRANCH" | "DRIVER";
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";
    createdAt: Date;
    updatedAt: Date | null;
    active: boolean;
    isVerified: boolean;
    branchUser: BranchUser;
    corporateUser: CorporateUser;
    customerUser: CustomerUser;
    driverUser: DriverUser;
    access: Access;
    userAuths: UserAuth[];
}
