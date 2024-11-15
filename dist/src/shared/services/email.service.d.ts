import { ConfigService } from "@nestjs/config";
export declare class EmailService {
    private readonly config;
    constructor(config: ConfigService);
    sendEmailVerification(recipient: any, recipientName: string, token: any, expiresIn: any): Promise<boolean>;
    sendResetPasswordOtp(recipient: any, recipientName: any, token: any): Promise<boolean>;
    private fetchFileContent;
}
