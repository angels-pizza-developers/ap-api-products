import { UserAuth } from "./UserAuth";
export declare class UserAuthLog {
    userAuthLogId: string;
    userAgent: string;
    eventType: "EMAIL_VERIFICATION" | "EMAIL_CHANGE" | "EMAIL_UPDATE_VERIFICATION" | "PHONE_VERIFICATION" | "ACCOUNT_ACTIVATION" | "ACCOUNT_DEACTIVATION" | "ACCOUNT_REACTIVATION" | "LOGIN_CONFIRMATION" | "ACCOUNT_DELETION" | "SOCIAL_LOGIN_LINK" | "DEVICE_VERIFICATION" | "LOGIN" | "LOGOUT" | "PASSWORD_RESET";
    eventTime: Date | null;
    ipAddress: string | null;
    authMethod: "PASSWORD" | "PIN" | "PASSWORDLESS" | "OTP" | "GOOGLE" | "FACEBOOK" | "APPLE" | "GITHUB" | "LINKEDIN" | "SSO" | "SAML" | "OAUTH2" | "OPENID_CONNECT" | "AZURE_AD" | "OKTA" | "FINGERPRINT" | "FACE_RECOGNITION" | "VOICE_RECOGNITION" | "2FA_SMS" | "2FA_EMAIL" | "2FA_AUTH_APP" | "2FA_HARDWARE_TOKEN" | "MAGIC_LINK" | "TOKEN" | "QR_CODE" | "GUEST";
    sessionId: string;
    status: "SUCCESS" | "FAILED" | "LOCKED" | "ACTIONS" | "PENDING" | "EXPIRED" | "TIMED_OUT" | "REVOKED" | "MFA_REQUIRED";
    mfaMethod: "SMS" | "EMAIL" | "AUTH_APP" | "HARDWARE_TOKEN" | "PUSH_NOTIFICATION" | "BIOMETRICS" | null;
    mfaStatus: "SUCCESS" | "FAILED" | "SKIPPED" | "TIMED_OUT" | "PENDING" | "NOT_REQUIRED" | null;
    geolocation: string | null;
    failedReason: string | null;
    loginAt: Date | null;
    logOutAt: Date | null;
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";
    accessToken: string;
    refreshToken: string;
    userAuth: UserAuth;
}
