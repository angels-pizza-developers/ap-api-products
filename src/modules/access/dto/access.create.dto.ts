import { PartialType } from "@nestjs/swagger";
import { BaseAccessDto } from "./access.base.dto";
export class CreateAccessDto extends PartialType(BaseAccessDto) {}
