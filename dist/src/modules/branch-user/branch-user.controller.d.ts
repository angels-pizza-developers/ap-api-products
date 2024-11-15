import { BranchUserService } from "./branch-user.service";
import { PaginationParamsDto } from "src/shared/dtos/pagination-params.dto";
import { CreateBranchUserDto } from "./dto/branch-user.create.dto";
import { UpdateBranchUserDto } from "./dto/branch-user.update.dto";
export declare class BranchUserController {
    private readonly branchUserService;
    constructor(branchUserService: BranchUserService);
    getPaginated(params: PaginationParamsDto): Promise<{
        results: import("../../database/entities/BranchUser").BranchUser[];
        total: number;
    }>;
    create(createBranchUserDto: CreateBranchUserDto): Promise<import("../../database/entities/BranchUser").BranchUser>;
    findOne(id: string): Promise<import("../../database/entities/BranchUser").BranchUser>;
    update(id: string, dto: UpdateBranchUserDto): Promise<import("../../database/entities/BranchUser").BranchUser>;
    remove(id: string): Promise<import("../../database/entities/BranchUser").BranchUser>;
}
