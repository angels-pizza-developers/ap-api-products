import { ConfigService } from "@nestjs/config";
import { AuthService } from "../service/auth.service";
import { AUTH_METHOD } from "src/shared/constants/auth-method.constant";
import { USER_ROLE } from "src/shared/constants/user-role.constant";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    validate({ userId, providerUserId, sessionId, exp }: {
        userId: any;
        providerUserId: any;
        sessionId: any;
        exp: any;
    }): Promise<{
        userId: string;
        providerUserId: string;
        authMethod: AUTH_METHOD;
        role: USER_ROLE;
        brand: any;
        sessionId: any;
    }>;
}
export {};
