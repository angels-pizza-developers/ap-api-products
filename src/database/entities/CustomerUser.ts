import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CustomerAddress } from "./CustomerAddress";
import { User } from "./User";

@Index("CustomerUser_MobileNumber_Active_idx", ["active", "mobileNumber"], {
  unique: true,
})
@Index("CustomerUser_Email_Active_idx", ["active", "email"], { unique: true })
@Index("CustomerUser_pkey", ["customerUserId"], { unique: true })
@Index("CustomerUser_UserId_idx", ["userId"], { unique: true })
@Entity("CustomerUser", { schema: "dbo" })
export class CustomerUser {
  @PrimaryGeneratedColumn({ type: "bigint", name: "CustomerUserId" })
  customerUserId: string;

  @Column("bigint", { name: "UserId" })
  userId: string;

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

  @Column("character varying", { name: "FullName", nullable: true })
  fullName: string | null;

  @OneToMany(
    () => CustomerAddress,
    (customerAddress) => customerAddress.customerUser
  )
  customerAddresses: CustomerAddress[];

  @OneToOne(() => User, (user) => user.customerUser)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: User;
}
