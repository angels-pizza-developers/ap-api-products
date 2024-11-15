import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/category.create.dto";
import { UpdateCategoryDto } from "./dto/category.update.dto";
import { PaginationParamsDto } from "src/shared/dtos/pagination-params.dto";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getPaginated(params: PaginationParamsDto): Promise<{
        results: import("../../database/entities/Category").Category[];
        total: number;
    }>;
    create(createCategoryDto: CreateCategoryDto): Promise<import("../../database/entities/Category").Category>;
    findOne(id: string): Promise<import("../../database/entities/Category").Category>;
    update(id: string, dto: UpdateCategoryDto): Promise<import("../../database/entities/Category").Category>;
    remove(id: string): Promise<import("../../database/entities/Category").Category>;
}
