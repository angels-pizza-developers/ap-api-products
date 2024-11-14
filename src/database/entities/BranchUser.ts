import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Branch } from "./Branch";
import { User } from "./User";

@Index("BranchUser_Email_Active_idx", ["active", "email"], { unique: true })
@Index("BranchUser_MobileNumber_Active_idx", ["active", "mobileNumber"], {
  unique: true,
})
@Index("BranchUser_pkey", ["branchUserId"], { unique: true })
@Index("BranchUser_UserId_idx", ["userId"], { unique: true })
@Entity("BranchUser", { schema: "dbo" })
export class BranchUser {
  @PrimaryGeneratedColumn({ type: "bigint", name: "BranchUserId" })
  branchUserId: string;

  @Column("bigint", { name: "UserId" })
  userId: string;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "Email", nullable: true })
  email: string | null;

  @Column("character varying", { name: "MobileNumber", nullable: true })
  mobileNumber: string | null;

  @Column("boolean", {
    name: "AccessGranted",
    nullable: true,
    default: () => "false",
  })
  accessGranted: boolean | null;

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => Branch, (branch) => branch.branchUsers)
  @JoinColumn([{ name: "BranchId", referencedColumnName: "branchId" }])
  branch: Branch;

  @OneToOne(() => User, (user) => user.branchUser)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: User;
}
