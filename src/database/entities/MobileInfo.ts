import { Column, Entity, Index } from "typeorm";

@Index("MobileInfo_pkey", ["mobileNumber", "userId"], { unique: true })
@Entity("MobileInfo", { schema: "dbo" })
export class MobileInfo {
  @Column("bigint", { primary: true, name: "UserId" })
  userId: string;

  @Column("character varying", { primary: true, name: "MobileNumber" })
  mobileNumber: string;

  @Column("character varying", { name: "Prefix", nullable: true })
  prefix: string | null;

  @Column("boolean", { name: "IsVerified", nullable: true })
  isVerified: boolean | null;
}
