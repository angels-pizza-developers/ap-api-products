import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("UserAuthLog_pkey", ["id"], { unique: true })
@Entity("UserAuthLog", { schema: "dbo" })
export class UserAuthLog {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("bigint", { name: "UserId" })
  userId: string;

  @Column("character varying", { name: "Username" })
  username: string;

  @Column("character varying", { name: "UserAgent" })
  userAgent: string;

  @Column("enum", {
    name: "EventType",
    enum: ["LOGIN", "LOGOUT", "PASSWORD_RESET"],
  })
  eventType: "LOGIN" | "LOGOUT" | "PASSWORD_RESET";

  @Column("timestamp without time zone", {
    name: "EventTime",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  eventTime: Date | null;

  @Column("character varying", { name: "IpAddress", nullable: true })
  ipAddress: string | null;

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

  @Column("character varying", { name: "SessionId" })
  sessionId: string;

  @Column("enum", {
    name: "Status",
    enum: [
      "SUCCESS",
      "FAILED",
      "LOCKED",
      "ACTIONS",
      "PENDING",
      "EXPIRED",
      "TIMED_OUT",
      "REVOKED",
      "MFA_REQUIRED",
    ],
  })
  status:
    | "SUCCESS"
    | "FAILED"
    | "LOCKED"
    | "ACTIONS"
    | "PENDING"
    | "EXPIRED"
    | "TIMED_OUT"
    | "REVOKED"
    | "MFA_REQUIRED";

  @Column("enum", {
    name: "MfaMethod",
    enum: [
      "SMS",
      "EMAIL",
      "AUTH_APP",
      "HARDWARE_TOKEN",
      "PUSH_NOTIFICATION",
      "BIOMETRICS",
    ],
  })
  mfaMethod:
    | "SMS"
    | "EMAIL"
    | "AUTH_APP"
    | "HARDWARE_TOKEN"
    | "PUSH_NOTIFICATION"
    | "BIOMETRICS";

  @Column("enum", {
    name: "MfaStatus",
    nullable: true,
    enum: [
      "SUCCESS",
      "FAILED",
      "SKIPPED",
      "TIMED_OUT",
      "PENDING",
      "NOT_REQUIRED",
    ],
  })
  mfaStatus:
    | "SUCCESS"
    | "FAILED"
    | "SKIPPED"
    | "TIMED_OUT"
    | "PENDING"
    | "NOT_REQUIRED"
    | null;

  @Column("character varying", { name: "Geolocation", nullable: true })
  geolocation: string | null;

  @Column("text", { name: "FailedReason", nullable: true })
  failedReason: string | null;

  @Column("timestamp with time zone", { name: "LoginAt", nullable: true })
  loginAt: Date | null;

  @Column("timestamp with time zone", { name: "LogOutAt", nullable: true })
  logOutAt: Date | null;

  @Column("character varying", { name: "Brand" })
  brand: string;
}
