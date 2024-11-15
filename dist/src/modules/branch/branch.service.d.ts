import { Branch } from "src/database/entities/Branch";
import { BranchRepository } from "src/database/repositories/branch.repository";
import { CreateBranchDto } from "./dto/branch.create.dto";
import { UpdateBranchDto } from "./dto/branch.update.dto";
export declare class BranchService {
    private readonly branchRepository;
    constructor(branchRepository: BranchRepository);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Branch[];
        total: number;
    }>;
    create(dto: CreateBranchDto): Promise<Branch>;
    findOne(id: string): Promise<Branch>;
    update(id: string, dto: UpdateBranchDto): Promise<Branch>;
    remove(id: string): Promise<Branch>;
}
