import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("OptionValuePricing_pkey", ["id"], { unique: true })
@Entity("OptionValuePricing", { schema: "dbo" })
export class OptionValuePricing {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("numeric", { name: "Price", precision: 10, scale: 2 })
  price: string;

  @Column("bigint", { name: "Product" })
  product: string;

  @Column("integer", { name: "Quantity" })
  quantity: number;

  @Column("character varying", {
    name: "ItemCode",
    nullable: true,
    length: 255,
  })
  itemCode: string | null;
}
