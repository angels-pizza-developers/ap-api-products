import { AUTH_TOKENT_TYPE } from "src/shared/constants/auth-token-type.constant";
export interface TokenPayload {
    userId?: string;
    providerUserId?: string;
    authMethod?: string;
    role?: string;
    brand?: string;
    tokenType: AUTH_TOKENT_TYPE;
    sessionId: any;
    data?: any;
}
export interface StateTokenPayload {
    sessionId: string;
    userAgent: string;
    ipAddress: string;
    timezone: string;
    geolocation: string;
}
