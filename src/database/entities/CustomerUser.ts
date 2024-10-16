import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("CustomerUser_pkey", ["customerUserId"], { unique: true })
@Entity("CustomerUser", { schema: "dbo" })
export class CustomerUser {
  @PrimaryGeneratedColumn({ type: "bigint", name: "CustomerUserId" })
  customerUserId: string;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @Column("character varying", { name: "FirstName" })
  firstName: string;

  @Column("character varying", { name: "MiddleName", nullable: true })
  middleName: string | null;

  @Column("character varying", { name: "LastName" })
  lastName: string;

  @Column("date", { name: "Birthdate", nullable: true })
  birthdate: string | null;

  @Column("character varying", { name: "ImageUrl", nullable: true })
  imageUrl: string | null;

  @Column("character varying", { name: "Email", nullable: true })
  email: string | null;

  @Column("character varying", { name: "MobileNumber", nullable: true })
  mobileNumber: string | null;

  @Column("character varying", { name: "MobileCountryCode", nullable: true })
  mobileCountryCode: string | null;

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => User, (user) => user.customerUsers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: User;
}
