import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PaymentMethod_pkey", ["paymentMethodId"], { unique: true })
@Entity("PaymentMethod", { schema: "dbo" })
export class PaymentMethod {
  @PrimaryGeneratedColumn({ type: "bigint", name: "PaymentMethodId" })
  paymentMethodId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "Description" })
  description: string;

  @Column("enum", {
    name: "Brand",
    nullable: true,
    enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"],
  })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE" | null;

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", nullable: true })
  active: boolean | null;
}
