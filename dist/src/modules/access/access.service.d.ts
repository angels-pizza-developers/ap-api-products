import { CreateAccessDto } from "./dto/access.create.dto";
import { Access } from "src/database/entities/Access";
import { UpdateAccessDto } from "./dto/access.update.dto";
import { AccessRepository } from "src/database/repositories/access.repository";
export declare class AccessService {
    private readonly accessRepository;
    constructor(accessRepository: AccessRepository);
    getAccessPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Access[];
        total: number;
    }>;
    findOne(accessId: any): Promise<Access>;
    create(dto: CreateAccessDto): Promise<Access>;
    update(accessId: any, dto: UpdateAccessDto): Promise<Access>;
    remove(accessId: any): Promise<Access>;
}
