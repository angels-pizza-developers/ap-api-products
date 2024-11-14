import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { MobileNumberDto } from "./mobile.dto";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    isArray: false,
    type: MobileNumberDto,
  })
  @IsNotEmpty()
  @Type(() => MobileNumberDto)
  @ValidateNested()
  mobileDetails: MobileNumberDto;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
