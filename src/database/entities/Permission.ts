import { Column, Entity, Index } from "typeorm";

@Index("Permission_pkey", ["permissionCode"], { unique: true })
@Entity("Permission", { schema: "dbo" })
export class Permission {
  @Column("character varying", { primary: true, name: "PermissionCode" })
  permissionCode: string;

  @Column("character varying", { name: "PermissionName" })
  permissionName: string;

  @Column("character varying", { name: "PermissionPage" })
  permissionPage: string;
}
