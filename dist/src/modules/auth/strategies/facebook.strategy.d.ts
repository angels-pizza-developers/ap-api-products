import { VerifyCallback } from "passport-facebook";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../service/auth.service";
import { TokenService } from "../service/token.service";
declare const FacebookStrategy_base: new (...args: any[]) => any;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private authService;
    private tokenService;
    private configService;
    constructor(authService: AuthService, tokenService: TokenService, configService: ConfigService);
    validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
