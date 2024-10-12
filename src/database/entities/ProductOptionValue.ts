import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("ProductOptionValue_pkey", ["id"], { unique: true })
@Entity("ProductOptionValue", { schema: "dbo" })
export class ProductOptionValue {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("character varying", { name: "Name", length: 255 })
  name: string;

  @Column("numeric", { name: "Price", precision: 10, scale: 2 })
  price: string;

  @Column("bigint", { name: "Product" })
  product: string;

  @Column("bigint", { name: "Category" })
  category: string;

  @Column("integer", { name: "Quantity" })
  quantity: number;

  @Column("text", { name: "ImageUrl", nullable: true })
  imageUrl: string | null;

  @Column("character varying", {
    name: "ItemCode",
    nullable: true,
    length: 255,
  })
  itemCode: string | null;

  @Column("boolean", { name: "IsDefault" })
  isDefault: boolean;

  @Column("integer", { name: "SortOrder" })
  sortOrder: number;

  @Column("text", { name: "Description" })
  description: string;

  @Column("character varying", {
    name: "CategoryName",
    nullable: true,
    length: 255,
  })
  categoryName: string | null;

  @Column("bigint", { name: "ProductOption" })
  productOption: string;

  @Column("text", { name: "ImageUrlSelected", nullable: true })
  imageUrlSelected: string | null;

  @Column("boolean", { name: "IsEnableOnSuperApp" })
  isEnableOnSuperApp: boolean;
}
