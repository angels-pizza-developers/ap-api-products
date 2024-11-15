import { DriverUserService } from "./driver-user.service";
import { CreateDriverUserDto } from "./dto/create-driver-user.dto";
import { UpdateDriverUserDto } from "./dto/update-driver-user.dto";
export declare class DriverUserController {
    private readonly driverUserService;
    constructor(driverUserService: DriverUserService);
    create(createDriverUserDto: CreateDriverUserDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDriverUserDto: UpdateDriverUserDto): string;
    remove(id: string): string;
}
