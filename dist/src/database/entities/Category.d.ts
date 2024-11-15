import { ProductCategory } from "./ProductCategory";
export declare class Category {
    categoryId: string;
    categoryCode: string;
    name: string;
    description: string;
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";
    imageUrl: string | null;
    sortOrder: number | null;
    createdAt: Date;
    updatedAt: Date | null;
    active: boolean;
    productCategories: ProductCategory[];
}
