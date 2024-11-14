import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Matches,
} from "class-validator";
import moment from "moment";

export class BaseBranchDto {
  @ApiProperty()
  @IsNotEmpty()
  branchCode: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsOptional()
  address: string;

  // @ApiProperty()
  // @IsOptional()
  // province: string;

  // @ApiProperty()
  // @IsOptional()
  // city: string;

  // @ApiProperty()
  // @IsOptional()
  // country: string;

  // @ApiProperty()
  // @IsOptional()
  // phone: string;

  // @ApiProperty()
  // @IsOptional()
  // locationCoordinates: string;

  // @ApiProperty()
  // @IsOptional()
  // disposition: string;

  // @ApiProperty({
  //   isArray: true,
  // })
  // @IsOptional()
  // @IsArray()
  // paymentMethodIds = [];

  // @ApiProperty()
  // @IsOptional()
  // @IsNumberString()
  // minOrderValue: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsNumberString()
  // maxOrderValue: string;

  // @ApiProperty({
  //   example: moment().format("hh:mm A"),
  //   default: moment().format("hh:mm A"),
  // })
  // @IsNotEmpty()
  // @Transform(({ obj, key }) => obj[key]?.toString().toUpperCase())
  // @Matches(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/g, {
  //   message: "Invalid time format",
  // })
  // opensAt: string;

  // @ApiProperty({
  //   example: moment().format("hh:mm A"),
  //   default: moment().format("hh:mm A"),
  // })
  // @IsNotEmpty()
  // @Transform(({ obj, key }) => obj[key]?.toString().toUpperCase())
  // @Matches(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/g, {
  //   message: "Invalid time format",
  // })
  // closesAt: string;
}
