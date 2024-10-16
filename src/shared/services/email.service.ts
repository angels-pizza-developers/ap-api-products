import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { readFile } from 'fs/promises'; // ES6 import for file system access
import { ConfigService } from '@nestjs/config';
import path from 'path';

@Injectable()
export class EmailService {
  constructor(private readonly config: ConfigService) {}

  async sendEmailVerification(recipient, recipientName = '', token) {
    try {
      const authEmailUser = this.config.get<string>('AUTH_VERIFY_EMAIL_USER');
      const authEmailPass = this.config.get<string>(
        'AUTH_VERIFY_EMAIL_PASSWORD',
      );
      const emailAddress = this.config.get<string>('AUTH_VERIFY_ADDRESS');
      const emailSubject = this.config.get<string>('AUTH_VERIFY_SUBJECT');
      const emailTempPath = this.config.get<string>(
        'AUTH_VERIFY_TEMPLATE_PATH',
      );
      const company = this.config.get<string>('EMAIL_SERVICE_COMPANY_NAME');
      const verifyURL = this.config.get<string>('AUTH_VERIFY_URL');
      const imagePath = this.config.get<string>('EMAIL_SERVICE_IMAGE_PATH');
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Use 'gmail' for Google's SMTP
        auth: {
          user: authEmailUser, // Replace with your Gmail address
          pass: authEmailPass.toString().trim(), // Replace with your Gmail App Password
        },
      });
      let emailTemplate = await readFile(
        path.join(__dirname, emailTempPath),
        'utf-8',
      );
      emailTemplate = emailTemplate.replace(
        '{{_AUTH_VERIFY_URL_}}',
        `${verifyURL}?token=${token}`,
      );
      emailTemplate = emailTemplate.replace(
        '{{_YEAR_}}',
        new Date().getFullYear().toString(),
      );
      emailTemplate = emailTemplate.replace(
        '{{_RECIPIENT_FULL_NAME_}}',
        recipientName.toString().trim(),
      );
      emailTemplate = emailTemplate.replace(
        '{{_EMAIL_SERVICE_COMPANY_NAME_}}',
        company,
      );
      emailTemplate = emailTemplate.replace(
        '{{_EMAIL_SERVICE_IMAGE_PATH_}}',
        imagePath,
      );
      const info = await transporter.sendMail({
        from: emailAddress, // Sender address
        to: recipient, // List of recipients
        subject: emailSubject, // Subject line
        html: emailTemplate, // HTML body
      });

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return true;
    } catch (ex) {
      throw ex;
    }
  }

  async sendResetPasswordOtp(recipient, recipientName, token) {
    try {
      const authEmailUser = this.config.get<string>('AUTH_VERIFY_EMAIL_USER');
      const authEmailPass = this.config.get<string>(
        'AUTH_VERIFY_EMAIL_PASSWORD',
      );
      const emailAddress = this.config.get<string>('AUTH_VERIFY_ADDRESS');
      const emailSubject = this.config.get<string>('AUTH_VERIFY_RESET_SUBJECT');
      const emailTempPath = this.config.get<string>(
        'AUTH_VERIFY_RESET_TEMPLATE_PATH',
      );
      const company = this.config.get<string>('EMAIL_SERVICE_COMPANY_NAME');
      const verifyURL = this.config.get<string>('AUTH_VERIFY_URL');
      const imagePath = this.config.get<string>('EMAIL_SERVICE_IMAGE_PATH');
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Use 'gmail' for Google's SMTP
        auth: {
          user: authEmailUser, // Replace with your Gmail address
          pass: authEmailPass.toString().trim(), // Replace with your Gmail App Password
        },
      });
      let emailTemplate = await readFile(
        path.join(__dirname, emailTempPath),
        'utf-8',
      );
      emailTemplate = emailTemplate.replace(
        '{{_AUTH_VERIFY_URL_}}',
        `${verifyURL}?token=${token}`,
      );
      emailTemplate = emailTemplate.replace(
        '{{_YEAR_}}',
        new Date().getFullYear().toString(),
      );
      emailTemplate = emailTemplate.replace(
        '{{_RECIPIENT_FULL_NAME_}}',
        recipientName.toString().trim(),
      );
      emailTemplate = emailTemplate.replace(
        '{{_EMAIL_SERVICE_COMPANY_NAME_}}',
        company,
      );
      emailTemplate = emailTemplate.replace(
        '{{_EMAIL_SERVICE_IMAGE_PATH_}}',
        imagePath,
      );
      const info = await transporter.sendMail({
        from: emailAddress, // Sender address
        to: recipient, // List of recipients
        subject: emailSubject, // Subject line
        html: emailTemplate, // HTML body
      });

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return true;
    } catch (ex) {
      throw ex;
    }
  }
}
