import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("ProductOptionValue_pkey", ["productOptionValueId"], { unique: true })
@Entity("ProductOptionValue", { schema: "dbo" })
export class ProductOptionValue {
  @PrimaryGeneratedColumn({ type: "bigint", name: "ProductOptionValueId" })
  productOptionValueId: string;

  @Column("bigint", { name: "ProductOptionId" })
  productOptionId: string;

  @Column("bigint", { name: "ProductId" })
  productId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("numeric", { name: "Price", default: () => "0" })
  price: string;

  @Column("boolean", { name: "IsDefault", nullable: true })
  isDefault: boolean | null;

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;
}
