import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("ProductOptionType_pkey", ["productOptionTypeId"], { unique: true })
@Entity("ProductOptionType", { schema: "dbo" })
export class ProductOptionType {
  @PrimaryGeneratedColumn({ type: "bigint", name: "ProductOptionTypeId" })
  productOptionTypeId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

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
