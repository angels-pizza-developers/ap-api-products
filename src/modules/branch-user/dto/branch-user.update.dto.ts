import { PartialType } from "@nestjs/swagger";
import { BaseBranchUserDto } from "./branch-user.base.dto";

export class UpdateBranchUserDto extends PartialType(BaseBranchUserDto) {}
