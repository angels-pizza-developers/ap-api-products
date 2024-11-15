import { BranchService } from "./branch.service";
import { PaginationParamsDto } from "src/shared/dtos/pagination-params.dto";
import { CreateBranchDto } from "./dto/branch.create.dto";
import { UpdateBranchDto } from "./dto/branch.update.dto";
export declare class BranchController {
    private readonly branchService;
    constructor(branchService: BranchService);
    getPaginated(params: PaginationParamsDto): Promise<{
        results: import("../../database/entities/Branch").Branch[];
        total: number;
    }>;
    create(createBranchDto: CreateBranchDto): Promise<import("../../database/entities/Branch").Branch>;
    findOne(id: string): Promise<import("../../database/entities/Branch").Branch>;
    update(id: string, dto: UpdateBranchDto): Promise<import("../../database/entities/Branch").Branch>;
    remove(id: string): Promise<import("../../database/entities/Branch").Branch>;
}
