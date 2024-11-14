import { PartialType } from "@nestjs/swagger";
import { CreateDriverUserDto } from "./create-driver-user.dto";

export class UpdateDriverUserDto extends PartialType(CreateDriverUserDto) {}
