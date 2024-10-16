import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccessType } from "./AccessType";
import { User } from "./User";

@Index("UserAccessType_pkey", ["active", "userAccessTypeId"], { unique: true })
@Entity("UserAccessType", { schema: "dbo" })
export class UserAccessType {
  @PrimaryGeneratedColumn({ type: "bigint", name: "UserAccessTypeId" })
  userAccessTypeId: string;

  @Column("boolean", { primary: true, name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => AccessType, (accessType) => accessType.userAccessTypes)
  @JoinColumn([{ name: "AccessTypeId", referencedColumnName: "accessTypeId" }])
  accessType: AccessType;

  @ManyToOne(() => User, (user) => user.userAccessTypes)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: User;
}
