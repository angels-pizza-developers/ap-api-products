import { Column, Entity, Index, OneToMany } from "typeorm";
import { UserAccessType } from "./UserAccessType";

@Index("AccessType_pkey", ["accessTypeId"], { unique: true })
@Entity("AccessType", { schema: "dbo" })
export class AccessType {
  @Column("bigint", { primary: true, name: "AccessTypeId" })
  accessTypeId: string;

  @Column("character varying", { name: "Name", nullable: true })
  name: string | null;

  @Column("timestamp with time zone", { name: "CreatedAt", nullable: true })
  createdAt: Date | null;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", nullable: true })
  active: boolean | null;

  @OneToMany(
    () => UserAccessType,
    (userAccessType) => userAccessType.accessType
  )
  userAccessTypes: UserAccessType[];
}
