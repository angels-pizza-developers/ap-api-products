import { Injectable } from "@nestjs/common";
import { CreateDriverUserDto } from "./dto/create-driver-user.dto";
import { UpdateDriverUserDto } from "./dto/update-driver-user.dto";

@Injectable()
export class DriverUserService {
  create(createDriverUserDto: CreateDriverUserDto) {
    return "This action adds a new driverUser";
  }

  findAll() {
    return `This action returns all driverUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driverUser`;
  }

  update(id: number, updateDriverUserDto: UpdateDriverUserDto) {
    return `This action updates a #${id} driverUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} driverUser`;
  }
}
