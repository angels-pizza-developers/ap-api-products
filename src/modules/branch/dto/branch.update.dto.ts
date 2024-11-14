import { PartialType } from "@nestjs/swagger";
import { BaseBranchDto } from "./branch.base.dto";

export class UpdateBranchDto extends PartialType(BaseBranchDto) {}
