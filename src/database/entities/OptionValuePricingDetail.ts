import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("OptionValuePricingDetail_pkey", ["id"], { unique: true })
@Entity("OptionValuePricingDetail", { schema: "dbo" })
export class OptionValuePricingDetail {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("character varying", { name: "Name", length: 255 })
  name: string;

  @Column("numeric", { name: "Price", precision: 10, scale: 2 })
  price: string;

  @Column("bigint", { name: "Product" })
  product: string;

  @Column("character varying", {
    name: "ItemCode",
    nullable: true,
    length: 255,
  })
  itemCode: string | null;

  @Column("integer", { name: "SortOrder" })
  sortOrder: number;

  @Column("bigint", { name: "ProductOption" })
  productOption: string;
}
