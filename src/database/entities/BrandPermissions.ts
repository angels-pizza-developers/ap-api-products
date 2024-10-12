import { Column, Entity, Index } from "typeorm";

@Index("BrandPermissions_pkey", ["brandName", "userId"], { unique: true })
@Entity("BrandPermissions", { schema: "dbo" })
export class BrandPermissions {
  @Column("bigint", { primary: true, name: "UserId" })
  userId: string;

  @Column("character varying", { primary: true, name: "BrandName" })
  brandName: string;

  @Column("timestamp with time zone", { name: "Date" })
  date: Date;

  @Column("boolean", { name: "Allow", default: () => "true" })
  allow: boolean;

  @Column("character varying", { name: "Platform", nullable: true })
  platform: string | null;
}
