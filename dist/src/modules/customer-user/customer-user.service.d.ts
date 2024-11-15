import { CustomerUser } from "src/database/entities/CustomerUser";
import { Connection } from "typeorm";
import { RegisterCustomerUserDto } from "src/modules/auth/dto/register.dto";
import { CustomerUserRepository } from "src/database/repositories/customer-user.repository";
export declare class CustomerUserService {
    private readonly customerUserRepo;
    constructor(customerUserRepo: CustomerUserRepository);
    registerCustomer(dto: RegisterCustomerUserDto, authMethod: "PASSWORD" | "GOOGLE" | "FACEBOOK", connection?: Connection): Promise<CustomerUser>;
}
