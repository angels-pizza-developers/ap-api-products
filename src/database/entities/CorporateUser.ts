import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("CorporateUser_MobileNumber_Active_idx", ["active", "mobileNumber"], {
  unique: true,
})
@Index("CorporateUser_Email_Active_idx", ["active", "email"], { unique: true })
@Index("CorporateUser_pkey", ["corporateUserId"], { unique: true })
@Index("CorporateUser_UserId_idx", ["userId"], { unique: true })
@Entity("CorporateUser", { schema: "dbo" })
export class CorporateUser {
  @PrimaryGeneratedColumn({ type: "bigint", name: "CorporateUserId" })
  corporateUserId: string;

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

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "AccessGranted", default: () => "false" })
  accessGranted: boolean;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @OneToOne(() => User, (user) => user.corporateUser)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: User;
}
