import { CreateDriverUserDto } from "./dto/create-driver-user.dto";
import { UpdateDriverUserDto } from "./dto/update-driver-user.dto";
export declare class DriverUserService {
    create(createDriverUserDto: CreateDriverUserDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDriverUserDto: UpdateDriverUserDto): string;
    remove(id: number): string;
}
