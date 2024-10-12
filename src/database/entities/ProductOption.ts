import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("ProductOption_pkey", ["id"], { unique: true })
@Entity("ProductOption", { schema: "dbo" })
export class ProductOption {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("character varying", { name: "Name", length: 255 })
  name: string;

  @Column("bigint", { name: "Product" })
  product: string;

  @Column("integer", { name: "Quantity" })
  quantity: number;

  @Column("character varying", {
    name: "ItemCode",
    nullable: true,
    length: 255,
  })
  itemCode: string | null;

  @Column("timestamp without time zone", { name: "CreatedAt" })
  createdAt: Date;

  @Column("boolean", { name: "IsFreebie" })
  isFreebie: boolean;

  @Column("integer", { name: "MaxAddOn" })
  maxAddOn: number;

  @Column("integer", { name: "MinAddOn" })
  minAddOn: number;

  @Column("integer", { name: "SortOrder" })
  sortOrder: number;

  @Column("timestamp without time zone", { name: "UpdatedAt" })
  updatedAt: Date;

  @Column("text", { name: "Description" })
  description: string;

  @Column("boolean", { name: "InFreebies" })
  inFreebies: boolean;

  @Column("boolean", { name: "IsRequired" })
  isRequired: boolean;

  @Column("character varying", { name: "OptionType", length: 255 })
  optionType: string;

  @Column("boolean", { name: "IsMainOption" })
  isMainOption: boolean;

  @Column("character varying", {
    name: "OptionDisplayType",
    nullable: true,
    length: 255,
  })
  optionDisplayType: string | null;

  @Column("boolean", { name: "IsEnableOnSuperApp" })
  isEnableOnSuperApp: boolean;

  @Column("boolean", { name: "IsSupercardExclusive" })
  isSupercardExclusive: boolean;

  @Column("numeric", { name: "MinimumAmountIfFree", precision: 10, scale: 2 })
  minimumAmountIfFree: string;

  @Column("boolean", { name: "IsConvertedToCheckboxQtyType" })
  isConvertedToCheckboxQtyType: boolean;
}
