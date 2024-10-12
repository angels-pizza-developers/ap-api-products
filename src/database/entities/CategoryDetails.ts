import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("CategoryDetails_pkey", ["id"], { unique: true })
@Entity("CategoryDetails", { schema: "dbo" })
export class CategoryDetails {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("character varying", { name: "Code", length: 255 })
  code: string;

  @Column("character varying", { name: "Name", length: 255 })
  name: string;

  @Column("character varying", { name: "Slug", length: 255 })
  slug: string;

  @Column("character varying", { name: "Brand", length: 255 })
  brand: string;

  @Column("bigint", { name: "Parent", nullable: true })
  parent: string | null;

  @Column("character varying", { name: "Status", length: 255 })
  status: string;

  @Column("boolean", { name: "InMenu" })
  inMenu: boolean;

  @Column("text", { name: "ImageUrl", nullable: true })
  imageUrl: string | null;

  @Column("character varying", {
    name: "BrandName",
    nullable: true,
    length: 255,
  })
  brandName: string | null;

  @Column("character varying", {
    name: "ClassCode",
    nullable: true,
    length: 255,
  })
  classCode: string | null;

  @Column("character varying", {
    name: "ClassName",
    nullable: true,
    length: 255,
  })
  className: string | null;

  @Column("timestamp without time zone", { name: "CreatedAt" })
  createdAt: Date;

  @Column("integer", { name: "SortOrder" })
  sortOrder: number;

  @Column("timestamp without time zone", { name: "UpdatedAt" })
  updatedAt: Date;

  @Column("text", { name: "Description" })
  description: string;

  @Column("character varying", {
    name: "ParentName",
    nullable: true,
    length: 255,
  })
  parentName: string | null;

  @Column("boolean", { name: "IsSupercardExclusive" })
  isSupercardExclusive: boolean;
}
