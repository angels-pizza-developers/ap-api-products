// src/auth/facebook.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AUTH_METHOD } from 'src/shared/constants/auth-method.constant';
import { BRAND_TYPE } from 'src/shared/constants/brand.constant';
import { USER_ROLE } from 'src/shared/constants/user-role.constant';
import { AuthService } from '../service/auth.service';
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
      callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL'),
      profileFields: ['id', 'emails', 'name', 'picture'], // Get these fields from Facebook
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id } = profile;
    const userAuth = await this.authService.validateUserAuth(
      BRAND_TYPE.ANGELS_PIZZA as any,
      id,
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
