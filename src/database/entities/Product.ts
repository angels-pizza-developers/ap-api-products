import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DaysAvailability } from "./DaysAvailability";

@Index("Product_pkey", ["id"], { unique: true })
@Entity("Product", { schema: "dbo" })
export class Product {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("character varying", { name: "Sku", length: 255 })
  sku: string;

  @Column("character varying", { name: "Name", length: 255 })
  name: string;

  @Column("character varying", { name: "Slug", length: 255 })
  slug: string;

  @Column("character varying", { name: "Brand", length: 255 })
  brand: string;

  @Column("numeric", { name: "Price", precision: 10, scale: 2 })
  price: string;

  @Column("character varying", { name: "Flavor", nullable: true, length: 255 })
  flavor: string | null;

  @Column("boolean", { name: "IsNew" })
  isNew: boolean;

  @Column("character varying", { name: "Status", length: 255 })
  status: string;

  @Column("timestamp without time zone", { name: "EndsAt", nullable: true })
  endsAt: Date | null;

  @Column("boolean", { name: "IsCombo" })
  isCombo: boolean;

  @Column("integer", { name: "Quantity" })
  quantity: number;

  @Column("text", { name: "ImageUrl", nullable: true })
  imageUrl: string | null;

  @Column("boolean", { name: "IsBundle" })
  isBundle: boolean;

  @Column("boolean", { name: "IsSingle" })
  isSingle: boolean;

  @Column("character varying", {
    name: "ItemCode",
    nullable: true,
    length: 255,
  })
  itemCode: string | null;

  @Column("timestamp without time zone", { name: "StartsAt" })
  startsAt: Date;

  @Column("character varying", {
    name: "BrandName",
    nullable: true,
    length: 255,
  })
  brandName: string | null;

  @Column("timestamp without time zone", { name: "CreatedAt" })
  createdAt: Date;

  @Column("boolean", { name: "IsFreebie" })
  isFreebie: boolean;

  @Column("timestamp without time zone", { name: "UpdatedAt" })
  updatedAt: Date;

  @Column("text", { name: "Description" })
  description: string;

  @Column("character varying", {
    name: "FlavorName",
    nullable: true,
    length: 255,
  })
  flavorName: string | null;

  @Column("boolean", { name: "IsFeatured" })
  isFeatured: boolean;

  @Column("integer", { name: "DeliveryTimeMin" })
  deliveryTimeMin: number;

  @Column("boolean", { name: "IsHalfProductImage" })
  isHalfProductImage: boolean;

  @Column("numeric", { name: "MinimumAmountIfFree", precision: 10, scale: 2 })
  minimumAmountIfFree: string;

  @Column("boolean", { name: "IsSuperCardExclusive" })
  isSuperCardExclusive: boolean;

  @OneToOne(
    () => DaysAvailability,
    (daysAvailability) => daysAvailability.product
  )
  daysAvailability: DaysAvailability;
}
