import { PartialType } from "@nestjs/swagger";
import { BaseAccessDto } from "./access.base.dto";

export class UpdateAccessDto extends PartialType(BaseAccessDto) {}
