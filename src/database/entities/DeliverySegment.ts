import { Column, Entity, Index } from "typeorm";

@Index("DeliverySegment_pkey", ["sku"], { unique: true })
@Entity("DeliverySegment", { schema: "dbo" })
export class DeliverySegment {
  @Column("character varying", { primary: true, name: "Sku", length: 255 })
  sku: string;

  @Column("character varying", { name: "DeliverySegment", length: 255 })
  deliverySegment: string;

  @Column("character varying", { name: "DeliverySegmentCode", length: 255 })
  deliverySegmentCode: string;

  @Column("numeric", { name: "DeliverySegmentPrice", precision: 10, scale: 2 })
  deliverySegmentPrice: string;

  @Column("bigint", { name: "ProductId" })
  productId: string;
}
