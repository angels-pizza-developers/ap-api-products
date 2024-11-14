import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("DriverUser_Email_Active_idx", ["active", "email"], { unique: true })
@Index("DriverUser_MobileNumber_Active_idx", ["active", "mobileNumber"], {
  unique: true,
})
@Index("DriverUser_pkey", ["driverUserId"], { unique: true })
@Index("DriverUser_UserId_idx", ["userId"], { unique: true })
@Entity("DriverUser", { schema: "dbo" })
export class DriverUser {
  @PrimaryGeneratedColumn({ type: "bigint", name: "DriverUserId" })
  driverUserId: string;

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

  @Column("boolean", { name: "AccessGranted", default: () => "false" })
  accessGranted: boolean;

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @OneToOne(() => User, (user) => user.driverUser)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: User;
}
