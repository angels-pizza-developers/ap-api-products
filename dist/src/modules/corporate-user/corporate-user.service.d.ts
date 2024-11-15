import { CreateCorporateUserDto } from "./dto/corporate-user.create.dto";
import { UpdateCorporateUserDto } from "./dto/corporate-user.update.dto";
import { CorporateUserRepository } from "src/database/repositories/corporate-user.repository";
import { CorporateUser } from "src/database/entities/CorporateUser";
export declare class CorporateUserService {
    private corporateUserRepository;
    constructor(corporateUserRepository: CorporateUserRepository);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: CorporateUser[];
        total: number;
    }>;
    create(dto: CreateCorporateUserDto): Promise<CorporateUser>;
    findOne(id: string): Promise<CorporateUser>;
    update(id: string, dto: UpdateCorporateUserDto): Promise<CorporateUser>;
    remove(id: string): Promise<CorporateUser>;
}
