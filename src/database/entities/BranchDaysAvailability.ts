import { Column, Entity, Index } from "typeorm";

@Index("DaysAvailability_pkey", ["branchId", "productId"], { unique: true })
@Entity("BranchDaysAvailability", { schema: "dbo" })
export class BranchDaysAvailability {
  @Column("bigint", { primary: true, name: "BranchId" })
  branchId: string;

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
}
