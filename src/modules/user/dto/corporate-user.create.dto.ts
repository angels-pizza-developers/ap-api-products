import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  ValidateNested,
} from 'class-validator';
import moment from 'moment';
import { MobileNumberDto } from './mobile.dto';
import { CreateUserDto } from './user.create.dto';

export class CreateCorporateUserDto extends CreateUserDto {
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
}
