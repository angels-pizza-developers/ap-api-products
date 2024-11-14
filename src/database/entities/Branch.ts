import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BranchUser } from "./BranchUser";

@Index("Branch_BranchCode_Active_idx", ["active", "branchCode"], {
  unique: true,
})
@Index("Branch_Name_Active_idx", ["active", "name"], { unique: true })
@Index("Branch_pkey", ["branchId"], { unique: true })
@Entity("Branch", { schema: "dbo" })
export class Branch {
  @PrimaryGeneratedColumn({ type: "bigint", name: "BranchId" })
  branchId: string;

  @Column("character varying", { name: "BranchCode", nullable: true })
  branchCode: string | null;

  @Column("enum", {
    name: "Brand",
    nullable: true,
    enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"],
  })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE" | null;

  @Column("character varying", { name: "Name", nullable: true })
  name: string | null;

  @Column("character varying", { name: "Description", nullable: true })
  description: string | null;

  @Column("character varying", { name: "Address", nullable: true })
  address: string | null;

  @Column("character varying", { name: "Province", nullable: true })
  province: string | null;

  @Column("character varying", { name: "City", nullable: true })
  city: string | null;

  @Column("character varying", { name: "Country", nullable: true })
  country: string | null;

  @Column("character varying", { name: "Phone", nullable: true })
  phone: string | null;

  @Column("character varying", { name: "LocationCoordinates", nullable: true })
  locationCoordinates: string | null;

  @Column("character varying", { name: "Disposition", nullable: true })
  disposition: string | null;

  @Column("varchar", {
    name: "PaymentMethodIds",
    nullable: true,
    array: true,
    default: () => "'{}'[]",
  })
  paymentMethodIds: string[] | null;

  @Column("numeric", { name: "MinOrderValue", default: () => "0" })
  minOrderValue: string;

  @Column("numeric", { name: "MaxOrderValue", default: () => "0" })
  maxOrderValue: string;

  @Column("time with time zone", { name: "OpensAt", nullable: true })
  opensAt: string | null;

  @Column("time with time zone", { name: "ClosesAt", nullable: true })
  closesAt: string | null;

  @Column("timestamp with time zone", { name: "ClosedFrom", nullable: true })
  closedFrom: Date | null;

  @Column("timestamp with time zone", { name: "ClosedUntil", nullable: true })
  closedUntil: Date | null;

  @Column("boolean", { name: "IsOperational", nullable: true })
  isOperational: boolean | null;

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @OneToMany(() => BranchUser, (branchUser) => branchUser.branch)
  branchUsers: BranchUser[];
}
