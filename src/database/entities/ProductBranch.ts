import { Column, Entity, Index } from "typeorm";

@Index("ProductBranch_pkey", ["branchId", "productId"], { unique: true })
@Entity("ProductBranch", { schema: "dbo" })
export class ProductBranch {
  @Column("bigint", { primary: true, name: "ProductId" })
  productId: string;

  @Column("bigint", { primary: true, name: "BranchId" })
  branchId: string;

  @Column("numeric", { name: "Stock", default: () => "0" })
  stock: string;

  @Column("boolean", { name: "IsAvailable", default: () => "true" })
  isAvailable: boolean;
}
