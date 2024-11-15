import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { TokenPayload } from "src/common/interface/payload.tokent.interface";
export declare class TokenService {
    private readonly jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    private getSecret;
    getTokenDecoded(token: string): any;
    verifyAccessToken(token: string): any;
    verifyRefreshToken(token: string): any;
    verifyEmailVerificationToken(token: string): any;
    verifySocialLoginToken(token: string): any;
    verifySocialVerificationToken(token: string): any;
    verifyPersonalAccessToken(token: string): any;
    generateToken(payload: TokenPayload, expiresIn: any): {
        token: string;
        decoded: any;
    };
    generateStateToken(payload: any, expiresIn: any): {
        token: string;
        decoded: any;
    };
}
