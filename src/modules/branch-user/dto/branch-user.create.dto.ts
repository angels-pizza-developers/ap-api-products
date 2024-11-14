import { ApiProperty, PartialType } from "@nestjs/swagger";
import { BaseBranchUserDto } from "./branch-user.base.dto";
import { IsNotEmpty } from "class-validator";
export class CreateBranchUserDto extends PartialType(BaseBranchUserDto) {
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  branchId: string;
}
