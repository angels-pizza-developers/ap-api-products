import { CategoryRepository } from "src/database/repositories/category.repository";
import { Category } from "src/database/entities/Category";
import { CreateCategoryDto } from "./dto/category.create.dto";
import { UpdateCategoryDto } from "./dto/category.update.dto";
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Category[];
        total: number;
    }>;
    create(dto: CreateCategoryDto): Promise<Category>;
    findOne(id: string): Promise<Category>;
    update(id: string, dto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<Category>;
}
