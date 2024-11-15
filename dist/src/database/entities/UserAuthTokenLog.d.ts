import { UserAuth } from "./UserAuth";
export declare class UserAuthTokenLog {
    userAuthTokenLogId: string;
    token: string;
    tokenType: "ACCESS" | "REFRESH" | "EMAIL_VERIFICATION" | "PASSWORD_RESET" | "MFA" | "DEVICE_VERIFICATION" | "API_KEY" | "INVITE" | "ACCOUNT_ACTIVATION" | "SESSION" | "REVOKE_ACCESS" | "ONE_TIME_USE" | "CONSENT_VERIFICATION" | "TWO_FACTOR_AUTHENTICATION" | "API_ACCESS" | "SECURE_OPERATION" | "EMAIL_UPDATE" | "SOCIAL_LOGIN" | "REGISTRATION" | "ACCOUNT_DELETION" | "AUTHORIZATION_CODE" | "PERSONAL_ACCESS_TOKEN" | "SESSION_REFRESH" | "NOTIFICATION_SUBSCRIPTION" | "SERVICE_AUTH" | "RECOVERY";
    issuedAt: Date;
    expiresAt: Date;
    usedAt: Date | null;
    status: "ACTIVE" | "USED" | "EXPIRED" | "REVOKED" | "INVALID" | "PENDING" | "FAILED" | "LOCKED" | "INACTIVE" | "BLACKLISTED" | "VERIFIED" | "UNVERIFIED" | "REISSUED" | "CONSUMED" | "SUPERSEDED" | "INVALIDATED" | "PENDING_VERIFICATION" | "ERROR" | "AWAITING_ACTION" | "DENIED";
    ipAddress: string | null;
    userAgent: string | null;
    geolocation: string | null;
    failedReason: string | null;
    isRevoked: boolean | null;
    revokedAt: Date | null;
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";
    userAuth: UserAuth;
}
