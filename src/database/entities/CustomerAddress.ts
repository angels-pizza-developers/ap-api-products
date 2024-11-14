import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CustomerUser } from "./CustomerUser";

@Index("CustomerAddress_pkey", ["customerAddressId"], { unique: true })
@Entity("CustomerAddress", { schema: "dbo" })
export class CustomerAddress {
  @PrimaryGeneratedColumn({ type: "bigint", name: "CustomerAddressId" })
  customerAddressId: string;

  @Column("character varying", { name: "Province", nullable: true })
  province: string | null;

  @Column("character varying", { name: "City", nullable: true })
  city: string | null;

  @Column("character varying", { name: "Barangay", nullable: true })
  barangay: string | null;

  @Column("character varying", { name: "Address", nullable: true })
  address: string | null;

  @Column("character varying", { name: "Building", nullable: true })
  building: string | null;

  @Column("character varying", { name: "Subdivision", nullable: true })
  subdivision: string | null;

  @Column("character varying", { name: "HouseNumber", nullable: true })
  houseNumber: string | null;

  @Column("jsonb", { name: "LocationCoordinates", default: {} })
  locationCoordinates: object;

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(
    () => CustomerUser,
    (customerUser) => customerUser.customerAddresses
  )
  @JoinColumn([
    { name: "CustomerUserId", referencedColumnName: "customerUserId" },
  ])
  customerUser: CustomerUser;
}
