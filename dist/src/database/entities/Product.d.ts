import { ProductCategory } from "./ProductCategory";
export declare class Product {
    productId: string;
    sku: string;
    itemCode: string;
    name: string;
    description: string | null;
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";
    price: string;
    flavor: string | null;
    isCombo: boolean | null;
    isBundle: boolean | null;
    isSingle: boolean | null;
    isFreebie: boolean | null;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    active: boolean;
    productCategories: ProductCategory[];
}
