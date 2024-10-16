import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("ProductOption_pkey", ["productOptionId"], { unique: true })
@Entity("ProductOption", { schema: "dbo" })
export class ProductOption {
  @PrimaryGeneratedColumn({ type: "bigint", name: "ProductOptionId" })
  productOptionId: string;

  @Column("bigint", { name: "ProductOptionTypeId" })
  productOptionTypeId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("numeric", { name: "Quantity", default: () => "1" })
  quantity: string;

  @Column("boolean", { name: "IsRequired" })
  isRequired: boolean;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;
}
