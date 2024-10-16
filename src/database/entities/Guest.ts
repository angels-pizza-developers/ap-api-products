import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("Guest_pkey", ["guestId"], { unique: true })
@Entity("Guest", { schema: "dbo" })
export class Guest {
  @PrimaryGeneratedColumn({ type: "bigint", name: "GuestId" })
  guestId: string;

  @Column("uuid", { name: "SessionId" })
  sessionId: string;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @Column("character varying", { name: "FirstName" })
  firstName: string;

  @Column("character varying", { name: "LastName" })
  lastName: string;

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
}
