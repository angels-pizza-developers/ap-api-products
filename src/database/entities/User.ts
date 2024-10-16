import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BranchUser } from "./BranchUser";
import { CustomerUser } from "./CustomerUser";
import { DriverUser } from "./DriverUser";
import { UserAccessType } from "./UserAccessType";
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

  @OneToMany(() => BranchUser, (branchUser) => branchUser.user)
  branchUsers: BranchUser[];

  @OneToMany(() => CustomerUser, (customerUser) => customerUser.user)
  customerUsers: CustomerUser[];

  @OneToMany(() => DriverUser, (driverUser) => driverUser.user)
  driverUsers: DriverUser[];

  @OneToMany(() => UserAccessType, (userAccessType) => userAccessType.user)
  userAccessTypes: UserAccessType[];

  @OneToMany(() => UserAuth, (userAuth) => userAuth.user)
  userAuths: UserAuth[];
}
