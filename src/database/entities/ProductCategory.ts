import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Product } from "./Product";

@Index("ProductCategory_pkey", ["productCategoryId"], { unique: true })
@Entity("ProductCategory", { schema: "dbo" })
export class ProductCategory {
  @PrimaryGeneratedColumn({ type: "bigint", name: "ProductCategoryId" })
  productCategoryId: string;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => Category, (category) => category.productCategories)
  @JoinColumn([{ name: "CategoryId", referencedColumnName: "categoryId" }])
  category: Category;

  @ManyToOne(() => Product, (product) => product.productCategories)
  @JoinColumn([{ name: "ProductId", referencedColumnName: "productId" }])
  product: Product;
}
