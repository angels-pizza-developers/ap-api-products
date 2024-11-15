import { BaseBranchUserDto } from "./branch-user.base.dto";
declare const CreateBranchUserDto_base: import("@nestjs/common").Type<Partial<BaseBranchUserDto>>;
export declare class CreateBranchUserDto extends CreateBranchUserDto_base {
    password: string;
    branchId: string;
}
export {};
