import { CustomerUser } from "src/database/entities/CustomerUser";
import { UserRepository } from "src/database/repositories/user.repository";
import { CorporateUser } from "src/database/entities/CorporateUser";
import { BranchUser } from "src/database/entities/BranchUser";
import { DriverUser } from "src/database/entities/DriverUser";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getProfile(userId: any): Promise<BranchUser | CorporateUser | CustomerUser | DriverUser>;
}
