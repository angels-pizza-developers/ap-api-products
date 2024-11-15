import { BadRequestException, Injectable } from "@nestjs/common";
import nodemailer from "nodemailer";
import { readFile } from "fs/promises"; // ES6 import for file system access
import { ConfigService } from "@nestjs/config";
import path from "path";
import { formatHours } from "../utils/time-formatter.utils";
import Handlebars from "handlebars";
import fetch from 'node-fetch';

@Injectable()
export class EmailService {
  constructor(private readonly config: ConfigService) {}

  async sendEmailVerification(recipient, recipientName = "", token, expiresIn) {
    try {
      const authEmailUser = this.config.get<string>("AUTH_VERIFY_EMAIL_USER");
      const authEmailPass = this.config.get<string>(
        "AUTH_VERIFY_EMAIL_PASSWORD",
      );
      const emailAddress = this.config.get<string>("AUTH_VERIFY_ADDRESS");
      const emailSubject = this.config.get<string>("AUTH_VERIFY_SUBJECT");
      const emailTempPath = this.config.get<string>(
        "AUTH_VERIFY_TEMPLATE_PATH",
      );
      const company = this.config.get<string>("EMAIL_SERVICE_COMPANY_NAME");
      const verifyURL = this.config.get<string>("AUTH_VERIFY_URL");
      const imagePath = this.config.get<string>("EMAIL_SERVICE_IMAGE_PATH");
      const expiryHour = formatHours(expiresIn);
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use 'gmail' for Google's SMTP
        auth: {
          user: authEmailUser, // Replace with your Gmail address
          pass: authEmailPass.toString().trim(), // Replace with your Gmail App Password
        },
      });
      const emailTemplate = emailTempPath.toString().includes("http") ? await this.fetchFileContent(emailTempPath) : await readFile(path.join(__dirname, emailTempPath),"utf-8");
      const template = Handlebars.compile(emailTemplate);
      const result = template({
        AUTH_VERIFY_URL: `${verifyURL}?token=${token}&provider_user=${recipient}`,
        YEAR: new Date().getFullYear().toString(),
        RECIPIENT_FULL_NAME: recipientName.toString().trim(),
        EMAIL_SERVICE_COMPANY_NAME: company,
        EMAIL_SERVICE_IMAGE_PATH: imagePath,
        TOKEN_EXPIRY: expiryHour,
      });
      const info = await transporter.sendMail({
        from: emailAddress, // Sender address
        to: recipient, // List of recipients
        subject: emailSubject, // Subject line
        html: result,
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return true;
    } catch (ex) {
      throw ex;
    }
  }

  async sendResetPasswordOtp(recipient, recipientName, token) {
    try {
      const authEmailUser = this.config.get<string>("AUTH_VERIFY_EMAIL_USER");
      const authEmailPass = this.config.get<string>(
        "AUTH_VERIFY_EMAIL_PASSWORD",
      );
      const emailAddress = this.config.get<string>("AUTH_VERIFY_ADDRESS");
      const emailSubject = this.config.get<string>("AUTH_VERIFY_RESET_SUBJECT");
      const emailTempPath = this.config.get<string>(
        "AUTH_VERIFY_RESET_TEMPLATE_PATH",
      );
      const company = this.config.get<string>("EMAIL_SERVICE_COMPANY_NAME");
      const verifyURL = this.config.get<string>("AUTH_VERIFY_URL");
      const imagePath = this.config.get<string>("EMAIL_SERVICE_IMAGE_PATH");
      let expiryHour = this.config.get<string>("AUTH_VERIFY_TOKEN_EXPIRE");
      expiryHour = formatHours(expiryHour);
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use 'gmail' for Google's SMTP
        auth: {
          user: authEmailUser, // Replace with your Gmail address
          pass: authEmailPass.toString().trim(), // Replace with your Gmail App Password
        },
      });
      const emailTemplate = emailTempPath.toString().includes("http") ? await this.fetchFileContent(emailTempPath) : await readFile(path.join(__dirname, emailTempPath),"utf-8");
      const template = Handlebars.compile(emailTemplate);
      const result = template({
        AUTH_VERIFY_URL: `${verifyURL}?token=${token}`,
        YEAR: new Date().getFullYear().toString(),
        RECIPIENT_FULL_NAME: recipientName.toString().trim(),
        EMAIL_SERVICE_COMPANY_NAME: company,
        EMAIL_SERVICE_IMAGE_PATH: imagePath,
        TOKEN_EXPIRY: expiryHour,
      });
      const info = await transporter.sendMail({
        from: emailAddress, // Sender address
        to: recipient, // List of recipients
        subject: emailSubject, // Subject line
        html: result,
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return true;
    } catch (ex) {
      throw ex;
    }
  }

  private async fetchFileContent(url: string): Promise<string> {
    try {
      // Ensure the URL is valid
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        throw new BadRequestException('Invalid URL');
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      // Return the file content as a string
      return await response.text();
    } catch (error) {
      throw new Error(`Error fetching remote file: ${error.message}`);
    }
  }
}
