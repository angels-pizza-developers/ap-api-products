import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { UserAuthLog } from "./UserAuthLog";

@Index("UserAuth_pkey", ["userAuthId"], { unique: true })
@Entity("UserAuth", { schema: "dbo" })
export class UserAuth {
  @PrimaryGeneratedColumn({ type: "bigint", name: "UserAuthId" })
  userAuthId: string;

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

  @Column("character varying", { name: "ProviderUserId", nullable: true })
  providerUserId: string | null;

  @Column("character varying", { name: "PasswordHash", nullable: true })
  passwordHash: string | null;

  @Column("boolean", { name: "IsVerified" })
  isVerified: boolean;

  @Column("timestamp with time zone", {
    name: "CreatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => User, (user) => user.userAuths)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: User;

  @OneToMany(() => UserAuthLog, (userAuthLog) => userAuthLog.userAuth)
  userAuthLogs: UserAuthLog[];
}
