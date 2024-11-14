import { PartialType } from "@nestjs/swagger";
import { CreateCustomerUserDto } from "./create-customer-user.dto";

export class UpdateCustomerUserDto extends PartialType(CreateCustomerUserDto) {}
