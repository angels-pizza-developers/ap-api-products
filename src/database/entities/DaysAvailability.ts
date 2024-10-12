import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Product } from "./Product";

@Index("DaysAvailability_pkey", ["productId"], { unique: true })
@Entity("DaysAvailability", { schema: "dbo" })
export class DaysAvailability {
  @Column("bigint", { primary: true, name: "ProductId" })
  productId: string;

  @Column("boolean", { name: "Friday" })
  friday: boolean;

  @Column("boolean", { name: "Monday" })
  monday: boolean;

  @Column("boolean", { name: "Sunday" })
  sunday: boolean;

  @Column("boolean", { name: "Tuesday" })
  tuesday: boolean;

  @Column("boolean", { name: "Saturday" })
  saturday: boolean;

  @Column("boolean", { name: "Thursday" })
  thursday: boolean;

  @Column("boolean", { name: "Wednesday" })
  wednesday: boolean;

  @OneToOne(() => Product, (product) => product.daysAvailability)
  @JoinColumn([{ name: "ProductId", referencedColumnName: "id" }])
  product: Product;
}
