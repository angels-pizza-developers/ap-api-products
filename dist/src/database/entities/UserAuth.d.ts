import { User } from "./User";
import { UserAuthLog } from "./UserAuthLog";
import { UserAuthTokenLog } from "./UserAuthTokenLog";
export declare class UserAuth {
    userAuthId: string;
    authMethod: "PASSWORD" | "PIN" | "PASSWORDLESS" | "OTP" | "GOOGLE" | "FACEBOOK" | "APPLE" | "GITHUB" | "LINKEDIN" | "SSO" | "SAML" | "OAUTH2" | "OPENID_CONNECT" | "AZURE_AD" | "OKTA" | "FINGERPRINT" | "FACE_RECOGNITION" | "VOICE_RECOGNITION" | "2FA_SMS" | "2FA_EMAIL" | "2FA_AUTH_APP" | "2FA_HARDWARE_TOKEN" | "MAGIC_LINK" | "TOKEN" | "QR_CODE" | "GUEST";
    providerUserId: string | null;
    passwordHash: string | null;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    active: boolean;
    user: User;
    userAuthLogs: UserAuthLog[];
    userAuthTokenLogs: UserAuthTokenLog[];
}
