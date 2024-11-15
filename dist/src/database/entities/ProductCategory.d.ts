import { Category } from "./Category";
import { Product } from "./Product";
export declare class ProductCategory {
    productCategoryId: string;
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";
    createdAt: Date;
    updatedAt: Date | null;
    active: boolean;
    category: Category;
    product: Product;
}
