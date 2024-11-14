import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserAuth } from "./UserAuth";

@Index("UserAuthLog_pkey", ["userAuthLogId"], { unique: true })
@Entity("UserAuthLog", { schema: "dbo" })
export class UserAuthLog {
  @PrimaryGeneratedColumn({ type: "bigint", name: "UserAuthLogId" })
  userAuthLogId: string;

  @Column("character varying", { name: "UserAgent" })
  userAgent: string;

  @Column("enum", {
    name: "EventType",
    enum: [
      "EMAIL_VERIFICATION",
      "EMAIL_CHANGE",
      "EMAIL_UPDATE_VERIFICATION",
      "PHONE_VERIFICATION",
      "ACCOUNT_ACTIVATION",
      "ACCOUNT_DEACTIVATION",
      "ACCOUNT_REACTIVATION",
      "LOGIN_CONFIRMATION",
      "ACCOUNT_DELETION",
      "SOCIAL_LOGIN_LINK",
      "DEVICE_VERIFICATION",
      "LOGIN",
      "LOGOUT",
      "PASSWORD_RESET",
    ],
  })
  eventType:
    | "EMAIL_VERIFICATION"
    | "EMAIL_CHANGE"
    | "EMAIL_UPDATE_VERIFICATION"
    | "PHONE_VERIFICATION"
    | "ACCOUNT_ACTIVATION"
    | "ACCOUNT_DEACTIVATION"
    | "ACCOUNT_REACTIVATION"
    | "LOGIN_CONFIRMATION"
    | "ACCOUNT_DELETION"
    | "SOCIAL_LOGIN_LINK"
    | "DEVICE_VERIFICATION"
    | "LOGIN"
    | "LOGOUT"
    | "PASSWORD_RESET";

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
    nullable: true,
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
    | "BIOMETRICS"
    | null;

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

  @Column("enum", { name: "Brand", enum: ["ANGELS_PIZZA", "FIGARO_COFFEE"] })
  brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";

  @Column("character varying", { name: "AccessToken" })
  accessToken: string;

  @Column("character varying", { name: "RefreshToken" })
  refreshToken: string;

  @ManyToOne(() => UserAuth, (userAuth) => userAuth.userAuthLogs)
  @JoinColumn([{ name: "UserAuthId", referencedColumnName: "userAuthId" }])
  userAuth: UserAuth;
}
