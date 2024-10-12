import { Column, Entity, Index } from "typeorm";

@Index("ServiceChannel_pkey", ["serviceChannel"], { unique: true })
@Entity("ServiceChannel", { schema: "dbo" })
export class ServiceChannel {
  @Column("character varying", {
    primary: true,
    name: "ServiceChannel",
    length: 255,
  })
  serviceChannel: string;

  @Column("bigint", { name: "ProductId" })
  productId: string;
}
