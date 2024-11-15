import { BranchUser } from "src/database/entities/BranchUser";
import { BranchUserRepository } from "src/database/repositories/branch-user.repository";
import { CreateBranchUserDto } from "./dto/branch-user.create.dto";
import { UpdateBranchUserDto } from "./dto/branch-user.update.dto";
export declare class BranchUserService {
    private branchUserRepository;
    constructor(branchUserRepository: BranchUserRepository);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: BranchUser[];
        total: number;
    }>;
    create(dto: CreateBranchUserDto): Promise<BranchUser>;
    findOne(id: string): Promise<BranchUser>;
    update(id: string, dto: UpdateBranchUserDto): Promise<BranchUser>;
    remove(id: string): Promise<BranchUser>;
}
