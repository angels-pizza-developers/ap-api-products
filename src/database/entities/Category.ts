import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductCategory } from "./ProductCategory";

@Index("Category_Name_Active_idx", ["active", "name"], { unique: true })
@Index("Category_CategoryCode_Active_idx", ["active", "categoryCode"], {
  unique: true,
})
@Index("Category_pkey", ["categoryId"], { unique: true })
@Entity("Category", { schema: "dbo" })
export class Category {
  @PrimaryGeneratedColumn({ type: "bigint", name: "CategoryId" })
  categoryId: string;

  @Column("character varying", { name: "CategoryCode" })
  categoryCode: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "Description" })
  description: string;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @Column("character varying", { name: "ImageUrl", nullable: true })
  imageUrl: string | null;

  @Column("integer", { name: "SortOrder", nullable: true })
  sortOrder: number | null;

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category
  )
  productCategories: ProductCategory[];
}
