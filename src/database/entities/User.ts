import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProfileCorporate } from "./ProfileCorporate";
import { ProfileCustomer } from "./ProfileCustomer";

@Index("User_pkey", ["userId"], { unique: true })
@Entity("User", { schema: "dbo" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", name: "UserId" })
  userId: string;

  @Column("character varying", { name: "Username" })
  username: string;

  @Column("timestamp with time zone", { name: "LastLogin", nullable: true })
  lastLogin: Date | null;

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @Column("enum", {
    name: "Status",
    enum: ["ENABLED", "DISABLED"],
    default: () => "'ENABLED'.user_status_enum",
  })
  status: "ENABLED" | "DISABLED";

  @Column("enum", {
    name: "AuthMethod",
    enum: [
      "PASSWORD",
      "PIN",
      "PASSWORDLESS",
      "OTP",
      "GOOGLE",
      "FACEBOOK",
      "APPLE",
      "GITHUB",
      "LINKEDIN",
      "SSO",
      "SAML",
      "OAUTH2",
      "OPENID_CONNECT",
      "AZURE_AD",
      "OKTA",
      "FINGERPRINT",
      "FACE_RECOGNITION",
      "VOICE_RECOGNITION",
      "2FA_SMS",
      "2FA_EMAIL",
      "2FA_AUTH_APP",
      "2FA_HARDWARE_TOKEN",
      "MAGIC_LINK",
      "TOKEN",
      "QR_CODE",
      "GUEST",
    ],
  })
  authMethod:
    | "PASSWORD"
    | "PIN"
    | "PASSWORDLESS"
    | "OTP"
    | "GOOGLE"
    | "FACEBOOK"
    | "APPLE"
    | "GITHUB"
    | "LINKEDIN"
    | "SSO"
    | "SAML"
    | "OAUTH2"
    | "OPENID_CONNECT"
    | "AZURE_AD"
    | "OKTA"
    | "FINGERPRINT"
    | "FACE_RECOGNITION"
    | "VOICE_RECOGNITION"
    | "2FA_SMS"
    | "2FA_EMAIL"
    | "2FA_AUTH_APP"
    | "2FA_HARDWARE_TOKEN"
    | "MAGIC_LINK"
    | "TOKEN"
    | "QR_CODE"
    | "GUEST";

  @Column("enum", { name: "Role", enum: ["CUSTOMER", "CORPORATE"] })
  role: "CUSTOMER" | "CORPORATE";

  @OneToMany(
    () => ProfileCorporate,
    (profileCorporate) => profileCorporate.user
  )
  profileCorporates: ProfileCorporate[];

  @OneToMany(() => ProfileCustomer, (profileCustomer) => profileCustomer.user)
  profileCustomers: ProfileCustomer[];
}
