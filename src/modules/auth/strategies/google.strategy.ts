/* eslint-disable @typescript-eslint/no-unused-vars */
// src/auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { RegisterCustomerDto } from '../dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { BRAND_TYPE } from 'src/shared/constants/brand.constant';
import { AUTH_METHOD } from 'src/shared/constants/auth-method.constant';
import { USER_ROLE } from 'src/shared/constants/user-role.constant';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, name } = profile;
    const email = emails[0].value; // Get the user's email

    let user = await this.authService.findByEmail(email);
    if (!user) {
      // Register new user if not found
      const customer = new RegisterCustomerDto();
      customer.firstName = name.givenName;
      customer.lastName = name.familyName;
      customer.email = email;
      customer.username = email;
      customer.brand = BRAND_TYPE.ANGELS_PIZZA;
      customer.authMethod = AUTH_METHOD.FACEBOOK as any;
      customer.role = USER_ROLE.CUSTOMER as any;
      user = await this.authService.registerCustomer(customer);
    }
    done(null, user);
  }
}
