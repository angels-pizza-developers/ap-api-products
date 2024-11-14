import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserAuth } from "./UserAuth";

@Index("UserAuthTokenLog_pkey", ["userAuthTokenLogId"], { unique: true })
@Entity("UserAuthTokenLog", { schema: "dbo" })
export class UserAuthTokenLog {
  @PrimaryGeneratedColumn({ type: "bigint", name: "UserAuthTokenLogId" })
  userAuthTokenLogId: string;

  @Column("character varying", { name: "Token" })
  token: string;

  @Column("enum", {
    name: "TokenType",
    enum: [
      "ACCESS",
      "REFRESH",
      "EMAIL_VERIFICATION",
      "PASSWORD_RESET",
      "MFA",
      "DEVICE_VERIFICATION",
      "API_KEY",
      "INVITE",
      "ACCOUNT_ACTIVATION",
      "SESSION",
      "REVOKE_ACCESS",
      "ONE_TIME_USE",
      "CONSENT_VERIFICATION",
      "TWO_FACTOR_AUTHENTICATION",
      "API_ACCESS",
      "SECURE_OPERATION",
      "EMAIL_UPDATE",
      "SOCIAL_LOGIN",
      "REGISTRATION",
      "ACCOUNT_DELETION",
      "AUTHORIZATION_CODE",
      "PERSONAL_ACCESS_TOKEN",
      "SESSION_REFRESH",
      "NOTIFICATION_SUBSCRIPTION",
      "SERVICE_AUTH",
      "RECOVERY",
    ],
  })
  tokenType:
    | "ACCESS"
    | "REFRESH"
    | "EMAIL_VERIFICATION"
    | "PASSWORD_RESET"
    | "MFA"
    | "DEVICE_VERIFICATION"
    | "API_KEY"
    | "INVITE"
    | "ACCOUNT_ACTIVATION"
    | "SESSION"
    | "REVOKE_ACCESS"
    | "ONE_TIME_USE"
    | "CONSENT_VERIFICATION"
    | "TWO_FACTOR_AUTHENTICATION"
    | "API_ACCESS"
    | "SECURE_OPERATION"
    | "EMAIL_UPDATE"
    | "SOCIAL_LOGIN"
    | "REGISTRATION"
    | "ACCOUNT_DELETION"
    | "AUTHORIZATION_CODE"
    | "PERSONAL_ACCESS_TOKEN"
    | "SESSION_REFRESH"
    | "NOTIFICATION_SUBSCRIPTION"
    | "SERVICE_AUTH"
    | "RECOVERY";

  @Column("timestamp without time zone", {
    name: "IssuedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  issuedAt: Date;

  @Column("timestamp without time zone", { name: "ExpiresAt" })
  expiresAt: Date;

  @Column("timestamp without time zone", { name: "UsedAt", nullable: true })
  usedAt: Date | null;

  @Column("enum", {
    name: "Status",
    enum: [
      "ACTIVE",
      "USED",
      "EXPIRED",
      "REVOKED",
      "INVALID",
      "PENDING",
      "FAILED",
      "LOCKED",
      "INACTIVE",
      "BLACKLISTED",
      "VERIFIED",
      "UNVERIFIED",
      "REISSUED",
      "CONSUMED",
      "SUPERSEDED",
      "INVALIDATED",
      "PENDING_VERIFICATION",
      "ERROR",
      "AWAITING_ACTION",
      "DENIED",
    ],
    default: () => "'ACTIVE'.auth_token_status_enum",
  })
  status:
    | "ACTIVE"
    | "USED"
    | "EXPIRED"
    | "REVOKED"
    | "INVALID"
    | "PENDING"
    | "FAILED"
    | "LOCKED"
    | "INACTIVE"
    | "BLACKLISTED"
    | "VERIFIED"
    | "UNVERIFIED"
    | "REISSUED"
    | "CONSUMED"
    | "SUPERSEDED"
    | "INVALIDATED"
    | "PENDING_VERIFICATION"
    | "ERROR"
    | "AWAITING_ACTION"
    | "DENIED";

  @Column("character varying", { name: "IpAddress", nullable: true })
  ipAddress: string | null;

  @Column("character varying", { name: "UserAgent", nullable: true })
  userAgent: string | null;

  @Column("character varying", { name: "Geolocation", nullable: true })
  geolocation: string | null;

  @Column("character varying", { name: "FailedReason", nullable: true })
  failedReason: string | null;

  @Column("boolean", {
    name: "IsRevoked",
    nullable: true,
    default: () => "false",
  })
  isRevoked: boolean | null;

  @Column("timestamp without time zone", { name: "RevokedAt ", nullable: true })
  revokedAt: Date | null;

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @ManyToOne(() => UserAuth, (userAuth) => userAuth.userAuthTokenLogs)
  @JoinColumn([{ name: "UserAuthId", referencedColumnName: "userAuthId" }])
  userAuth: UserAuth;
}
