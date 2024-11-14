import { PartialType } from "@nestjs/swagger";
import { BaseCorporateUserDto } from "./corporate-user.base.dto";

export class UpdateCorporateUserDto extends PartialType(BaseCorporateUserDto) {}
