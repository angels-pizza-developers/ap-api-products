import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductCategory } from "./ProductCategory";

@Index("Product_pkey", ["productId"], { unique: true })
@Entity("Product", { schema: "dbo" })
export class Product {
  @PrimaryGeneratedColumn({ type: "bigint", name: "ProductId" })
  productId: string;

  @Column("character varying", { name: "Sku" })
  sku: string;

  @Column("character varying", { name: "ItemCode" })
  itemCode: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("text", { name: "Description", nullable: true })
  description: string | null;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @Column("numeric", { name: "Price", default: () => "0" })
  price: string;

  @Column("character varying", { name: "Flavor", nullable: true })
  flavor: string | null;

  @Column("boolean", { name: "IsCombo", nullable: true })
  isCombo: boolean | null;

  @Column("boolean", { name: "IsBundle", nullable: true })
  isBundle: boolean | null;

  @Column("boolean", { name: "IsSingle", nullable: true })
  isSingle: boolean | null;

  @Column("boolean", { name: "IsFreebie", nullable: true })
  isFreebie: boolean | null;

  @Column("text", { name: "ImageUrl", nullable: true })
  imageUrl: string | null;

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
    (productCategory) => productCategory.product
  )
  productCategories: ProductCategory[];
}
