import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { DriverUserService } from "./driver-user.service";
import { CreateDriverUserDto } from "./dto/create-driver-user.dto";
import { UpdateDriverUserDto } from "./dto/update-driver-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("driver-user")
@Controller("driver-user")
export class DriverUserController {
  constructor(private readonly driverUserService: DriverUserService) {}

  @Post()
  create(@Body() createDriverUserDto: CreateDriverUserDto) {
    return this.driverUserService.create(createDriverUserDto);
  }

  @Get()
  findAll() {
    return this.driverUserService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.driverUserService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateDriverUserDto: UpdateDriverUserDto,
  ) {
    return this.driverUserService.update(+id, updateDriverUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.driverUserService.remove(+id);
  }
}
