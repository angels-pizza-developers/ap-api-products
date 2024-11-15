import { AccessService } from "./access.service";
import { UpdateAccessDto } from "./dto/access.update.dto";
import { PaginationParamsDto } from "src/shared/dtos/pagination-params.dto";
import { CreateAccessDto } from "./dto/access.create.dto";
export declare class AccessController {
    private readonly accessService;
    constructor(accessService: AccessService);
    getPaginated(params: PaginationParamsDto): Promise<{
        results: import("../../database/entities/Access").Access[];
        total: number;
    }>;
    create(dto: CreateAccessDto): Promise<import("../../database/entities/Access").Access>;
    findOne(id: string): Promise<import("../../database/entities/Access").Access>;
    update(id: string, dto: UpdateAccessDto): Promise<import("../../database/entities/Access").Access>;
    remove(id: string): Promise<import("../../database/entities/Access").Access>;
}
