"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = __importDefault(require("nodemailer"));
const promises_1 = require("fs/promises");
const config_1 = require("@nestjs/config");
const path_1 = __importDefault(require("path"));
const time_formatter_utils_1 = require("../utils/time-formatter.utils");
const handlebars_1 = __importDefault(require("handlebars"));
let EmailService = class EmailService {
    constructor(config) {
        this.config = config;
    }
    async sendEmailVerification(recipient, recipientName = "", token, expiresIn) {
        try {
            const authEmailUser = this.config.get("AUTH_VERIFY_EMAIL_USER");
            const authEmailPass = this.config.get("AUTH_VERIFY_EMAIL_PASSWORD");
            const emailAddress = this.config.get("AUTH_VERIFY_ADDRESS");
            const emailSubject = this.config.get("AUTH_VERIFY_SUBJECT");
            const emailTempPath = this.config.get("AUTH_VERIFY_TEMPLATE_PATH");
            const company = this.config.get("EMAIL_SERVICE_COMPANY_NAME");
            const verifyURL = this.config.get("AUTH_VERIFY_URL");
            const imagePath = this.config.get("EMAIL_SERVICE_IMAGE_PATH");
            const expiryHour = (0, time_formatter_utils_1.formatHours)(expiresIn);
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: authEmailUser,
                    pass: authEmailPass.toString().trim(),
                },
            });
            const emailTemplate = await (0, promises_1.readFile)(emailTempPath.toString().includes("http") ? emailTempPath : (path_1.default.join(__dirname, emailTempPath), "utf-8"));
            const template = handlebars_1.default.compile(emailTemplate);
            const result = template({
                AUTH_VERIFY_URL: `${verifyURL}?token=${token}&provider_user=${recipient}`,
                YEAR: new Date().getFullYear().toString(),
                RECIPIENT_FULL_NAME: recipientName.toString().trim(),
                EMAIL_SERVICE_COMPANY_NAME: company,
                EMAIL_SERVICE_IMAGE_PATH: imagePath,
                TOKEN_EXPIRY: expiryHour,
            });
            const info = await transporter.sendMail({
                from: emailAddress,
                to: recipient,
                subject: emailSubject,
                html: result,
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
            return true;
        }
        catch (ex) {
            throw ex;
        }
    }
    async sendResetPasswordOtp(recipient, recipientName, token) {
        try {
            const authEmailUser = this.config.get("AUTH_VERIFY_EMAIL_USER");
            const authEmailPass = this.config.get("AUTH_VERIFY_EMAIL_PASSWORD");
            const emailAddress = this.config.get("AUTH_VERIFY_ADDRESS");
            const emailSubject = this.config.get("AUTH_VERIFY_RESET_SUBJECT");
            const emailTempPath = this.config.get("AUTH_VERIFY_RESET_TEMPLATE_PATH");
            const company = this.config.get("EMAIL_SERVICE_COMPANY_NAME");
            const verifyURL = this.config.get("AUTH_VERIFY_URL");
            const imagePath = this.config.get("EMAIL_SERVICE_IMAGE_PATH");
            let expiryHour = this.config.get("AUTH_VERIFY_TOKEN_EXPIRE");
            expiryHour = (0, time_formatter_utils_1.formatHours)(expiryHour);
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: authEmailUser,
                    pass: authEmailPass.toString().trim(),
                },
            });
            const emailTemplate = await (0, promises_1.readFile)(emailTempPath.toString().includes("http") ? emailTempPath : (path_1.default.join(__dirname, emailTempPath), "utf-8"));
            const template = handlebars_1.default.compile(emailTemplate);
            const result = template({
                AUTH_VERIFY_URL: `${verifyURL}?token=${token}`,
                YEAR: new Date().getFullYear().toString(),
                RECIPIENT_FULL_NAME: recipientName.toString().trim(),
                EMAIL_SERVICE_COMPANY_NAME: company,
                EMAIL_SERVICE_IMAGE_PATH: imagePath,
                TOKEN_EXPIRY: expiryHour,
            });
            const info = await transporter.sendMail({
                from: emailAddress,
                to: recipient,
                subject: emailSubject,
                html: result,
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
            return true;
        }
        catch (ex) {
            throw ex;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map