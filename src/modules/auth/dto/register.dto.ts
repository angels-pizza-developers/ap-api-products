import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEmail, IsIn } from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class RegisterUserDto extends CreateUserDto {
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

  @ApiProperty()
  @IsNotEmpty()
  mobile: string;
}

export class RegisterCustomerDto extends RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;

}