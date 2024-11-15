import { Request, Response } from "express";
import { AuthService } from "./service/auth.service";
import { ApiResponseModel } from "src/common/models/api-response.model";
import { ConfigService } from "@nestjs/config";
import { LogInDto } from "./dto/login.dto";
import { RegisterCustomerUserDto } from "./dto/register.dto";
import { RequestMetadataModel } from "src/common/models/request-metadata.model";
export declare class AuthController {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    getUserProfile(req: any, _res: Response): Promise<Response<any, Record<string, any>>>;
    linkGoogle(res: Response, req: any, requestMetadata: RequestMetadataModel): Promise<void>;
    googleLogin(): Promise<void>;
    googleLoginCallback(req: any, res: any, requestMetadata: RequestMetadataModel): Promise<void>;
    linkFacebook(res: Response, req: any, requestMetadata: RequestMetadataModel): Promise<void>;
    facebookLogin(): Promise<void>;
    facebookLoginCallback(req: any, res: Response, requestMetadata: RequestMetadataModel): Promise<void>;
    login(requestMetadata: RequestMetadataModel, dto: LogInDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    registerCustomer(requestMetadata: RequestMetadataModel, dto: RegisterCustomerUserDto): Promise<import("../../database/entities/CustomerUser").CustomerUser>;
    verifyEmail(req: Request, res: Response): Promise<boolean>;
    resendEmailVerification(req: Request, _res: Response, requestMetadata: RequestMetadataModel): Promise<Response<any, Record<string, any>>>;
    refreshToken(req: Request, _res: Response): Promise<Response<any, Record<string, any>> | ApiResponseModel<any>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
