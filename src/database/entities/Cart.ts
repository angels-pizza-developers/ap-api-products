import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("Cart_pkey", ["cartId"], { unique: true })
@Entity("Cart", { schema: "dbo" })
export class Cart {
  @PrimaryGeneratedColumn({ type: "bigint", name: "CartId" })
  cartId: string;

  @Column("bigint", { name: "CustomerUserId", nullable: true })
  customerUserId: string | null;

  @Column("bigint", { name: "GuestId", nullable: true })
  guestId: string | null;

  @Column("character varying", { name: "FirstName" })
  firstName: string;

  @Column("character varying", { name: "LastName" })
  lastName: string;

  @Column("character varying", { name: "MobileNumber", nullable: true })
  mobileNumber: string | null;

  @Column("character varying", { name: "MobileCountryCode", nullable: true })
  mobileCountryCode: string | null;

  @Column("character varying", { name: "Email", nullable: true })
  email: string | null;

  @Column("bigint", { name: "PaymentMethodId" })
  paymentMethodId: string;

  @Column("numeric", { name: "PaymentChangeFor", nullable: true })
  paymentChangeFor: string | null;

  @Column("character varying", { name: "DeliveryAddress" })
  deliveryAddress: string;

  @Column("jsonb", { name: "LocationCoordinates", default: {} })
  locationCoordinates: object;

  @Column("bigint", { name: "CustomerAddressId" })
  customerAddressId: string;

  @Column("numeric", { name: "DeliveryFee", default: () => "0" })
  deliveryFee: string;

  @Column("enum", { name: "Disposition", enum: ["DELIVER", "PICK_UP"] })
  disposition: "DELIVER" | "PICK_UP";

  @Column("enum", { name: "DispositionType", enum: ["NOW", "LATER"] })
  dispositionType: "NOW" | "LATER";

  @Column("timestamp with time zone", {
    name: "DispositionSchedule",
    nullable: true,
  })
  dispositionSchedule: Date | null;

  @Column("character varying", { name: "PromoCode", nullable: true })
  promoCode: string | null;

  @Column("numeric", { name: "Subtotal", default: () => "0" })
  subtotal: string;

  @Column("numeric", { name: "Discount", default: () => "0" })
  discount: string;

  @Column("numeric", { name: "Total" })
  total: string;

  @Column("boolean", {
    name: "IsIncludeUtensils",
    nullable: true,
    default: () => "false",
  })
  isIncludeUtensils: boolean | null;

  @Column("character varying", { name: "SpecialInstructions", nullable: true })
  specialInstructions: string | null;

  @Column("character varying", { name: "NotesToRider", nullable: true })
  notesToRider: string | null;

  @Column("timestamp with time zone", {
    name: "PendingStateAt",
    nullable: true,
  })
  pendingStateAt: Date | null;

  @Column("timestamp with time zone", {
    name: "CancelledStateAt",
    nullable: true,
  })
  cancelledStateAt: Date | null;

  @Column("character varying", { name: "CancelReason", nullable: true })
  cancelReason: string | null;

  @Column("character varying", { name: "AdditionalReason", nullable: true })
  additionalReason: string | null;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

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
