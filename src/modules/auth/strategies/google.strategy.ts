/* eslint-disable @typescript-eslint/no-unused-vars */
// src/auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BRAND_TYPE } from 'src/shared/constants/brand.constant';
import { AUTH_METHOD } from 'src/shared/constants/auth-method.constant';
import { USER_ROLE } from 'src/shared/constants/user-role.constant';
import { AuthService } from '../service/auth.service';

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
    const { emails } = profile;
    const email = emails[0].value; // Get the user's email
    const userAuth = await this.authService.validateUserAuth(
      BRAND_TYPE.ANGELS_PIZZA as any,
      email,
      AUTH_METHOD.FACEBOOK as any,
    );
    if (!userAuth) {
      return done(null, false, false);
    }
    done(null, {
      userId: userAuth.user.userId,
      providerUserId: userAuth.providerUserId,
      authMethod: AUTH_METHOD.FACEBOOK,
      role: USER_ROLE.CUSTOMER,
      brand: BRAND_TYPE.ANGELS_PIZZA as any,
    });
  }
}
