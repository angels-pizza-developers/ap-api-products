import { ApiProperty, PartialType } from "@nestjs/swagger";
import { BaseCorporateUserDto } from "./corporate-user.base.dto";
import { IsNotEmpty } from "class-validator";
export class CreateCorporateUserDto extends PartialType(BaseCorporateUserDto) {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
