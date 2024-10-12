import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("ProfileCustomer_pkey", ["profileCustomerId"], { unique: true })
@Entity("ProfileCustomer", { schema: "dbo" })
export class ProfileCustomer {
  @PrimaryGeneratedColumn({ type: "bigint", name: "ProfileCustomerId" })
  profileCustomerId: string;

  @Column("character varying", { name: "FirstName" })
  firstName: string;

  @Column("character varying", { name: "MiddleName", nullable: true })
  middleName: string | null;

  @Column("character varying", { name: "LastName" })
  lastName: string;

  @Column("date", { name: "Birthdate", nullable: true })
  birthdate: string | null;

  @Column("text", { name: "ImageUrl", nullable: true })
  imageUrl: string | null;

  @Column("character varying", { name: "Email", nullable: true })
  email: string | null;

  @Column("character varying", { name: "Mobile", nullable: true })
  mobile: string | null;

  @Column("character varying", { name: "TempMobile", nullable: true })
  tempMobile: string | null;

  @Column("character varying", { name: "MobileCountryCode", nullable: true })
  mobileCountryCode: string | null;

  @Column("character varying", {
    name: "TempMobileCountryCode",
    nullable: true,
  })
  tempMobileCountryCode: string | null;

  @Column("character varying", { name: "Platform", nullable: true })
  platform: string | null;

  @Column("character varying", { name: "CountryCode", nullable: true })
  countryCode: string | null;

  @Column("character varying", { name: "Province", nullable: true })
  province: string | null;

  @Column("character varying", { name: "City", nullable: true })
  city: string | null;

  @Column("boolean", { name: "AllStore", nullable: true })
  allStore: boolean | null;

  @Column("character varying", { name: "ScNo", nullable: true })
  scNo: string | null;

  @Column("numeric", { name: "ScPoints", nullable: true })
  scPoints: string | null;

  @Column("character varying", { name: "ScCode", nullable: true })
  scCode: string | null;

  @Column("numeric", { name: "NooReferenceId", nullable: true })
  nooReferenceId: string | null;

  @Column("boolean", { name: "HasSupercard", nullable: true })
  hasSupercard: boolean | null;

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @ManyToOne(() => User, (user) => user.profileCustomers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: User;
}
