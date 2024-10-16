import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Branch } from "./Branch";
import { User } from "./User";

@Index("BranchUser_pkey", ["branchUserId"], { unique: true })
@Entity("BranchUser", { schema: "dbo" })
export class BranchUser {
  @PrimaryGeneratedColumn({ type: "bigint", name: "BranchUserId" })
  branchUserId: string;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @Column("character varying", { name: "FirstName" })
  firstName: string;

  @Column("character varying", { name: "MiddleName", nullable: true })
  middleName: string | null;

  @Column("character varying", { name: "LastName" })
  lastName: string;

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

  @ManyToOne(() => User, (user) => user.branchUsers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: User;
}
