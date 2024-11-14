import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BranchUser } from "./BranchUser";
import { CorporateUser } from "./CorporateUser";
import { CustomerUser } from "./CustomerUser";
import { DriverUser } from "./DriverUser";
import { Access } from "./Access";
import { UserAuth } from "./UserAuth";

@Index("User_pkey", ["userId"], { unique: true })
@Entity("User", { schema: "dbo" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", name: "UserId" })
  userId: string;

  @Column("enum", {
    name: "Role",
    enum: ["CUSTOMER", "CORPORATE", "BRANCH", "DRIVER"],
  })
  role: "CUSTOMER" | "CORPORATE" | "BRANCH" | "DRIVER";

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @Column("boolean", { name: "IsVerified", default: () => "false" })
  isVerified: boolean;

  @OneToOne(() => BranchUser, (branchUser) => branchUser.user)
  branchUser: BranchUser;

  @OneToOne(() => CorporateUser, (corporateUser) => corporateUser.user)
  corporateUser: CorporateUser;

  @OneToOne(() => CustomerUser, (customerUser) => customerUser.user)
  customerUser: CustomerUser;

  @OneToOne(() => DriverUser, (driverUser) => driverUser.user)
  driverUser: DriverUser;

  @ManyToOne(() => Access, (access) => access.users)
  @JoinColumn([{ name: "AccessId", referencedColumnName: "accessId" }])
  access: Access;

  @OneToMany(() => UserAuth, (userAuth) => userAuth.user)
  userAuths: UserAuth[];
}
