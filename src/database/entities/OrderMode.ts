import { Column, Entity, Index } from "typeorm";

@Index("OrderMode_pkey", ["orderMode"], { unique: true })
@Entity("OrderMode", { schema: "dbo" })
export class OrderMode {
  @Column("character varying", {
    primary: true,
    name: "OrderMode",
    length: 255,
  })
  orderMode: string;

  @Column("character varying", { name: "OrderModeCode", length: 255 })
  orderModeCode: string;

  @Column("bigint", { name: "ProductId" })
  productId: string;
}
