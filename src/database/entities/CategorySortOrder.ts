import { Column, Entity, Index } from "typeorm";

@Index("CategorySortOrder_pkey", ["category", "productId"], { unique: true })
@Entity("CategorySortOrder", { schema: "dbo" })
export class CategorySortOrder {
  @Column("bigint", { primary: true, name: "Category" })
  category: string;

  @Column("integer", { name: "SortOrder" })
  sortOrder: number;

  @Column("bigint", { primary: true, name: "ProductId" })
  productId: string;
}
