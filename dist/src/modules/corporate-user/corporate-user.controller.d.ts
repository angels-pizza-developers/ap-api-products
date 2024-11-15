import { CorporateUserService } from "./corporate-user.service";
import { CreateCorporateUserDto } from "./dto/corporate-user.create.dto";
import { PaginationParamsDto } from "src/shared/dtos/pagination-params.dto";
import { UpdateCorporateUserDto } from "./dto/corporate-user.update.dto";
export declare class CorporateUserController {
    private readonly corporateUserService;
    constructor(corporateUserService: CorporateUserService);
    getPaginated(params: PaginationParamsDto): Promise<{
        results: import("../../database/entities/CorporateUser").CorporateUser[];
        total: number;
    }>;
    create(createCorporateUserDto: CreateCorporateUserDto): Promise<import("../../database/entities/CorporateUser").CorporateUser>;
    findOne(id: string): Promise<import("../../database/entities/CorporateUser").CorporateUser>;
    update(id: string, dto: UpdateCorporateUserDto): Promise<import("../../database/entities/CorporateUser").CorporateUser>;
    remove(id: string): Promise<import("../../database/entities/CorporateUser").CorporateUser>;
}
