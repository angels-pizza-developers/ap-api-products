import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("AccessPermission_pkey", ["accessPermissionId"], { unique: true })
@Entity("AccessPermission", { schema: "dbo" })
export class AccessPermission {
  @PrimaryGeneratedColumn({ type: "bigint", name: "AccessPermissionId" })
  accessPermissionId: string;

  @Column("bigint", { name: "AccessTypeId" })
  accessTypeId: string;

  @Column("character varying", { name: "PermissionCode" })
  permissionCode: string;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;
}
