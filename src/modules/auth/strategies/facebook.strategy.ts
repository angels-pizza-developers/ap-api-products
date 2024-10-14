// src/auth/facebook.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { RegisterCustomerDto } from '../dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { AUTH_METHOD } from 'src/shared/constants/auth-method.constant';
import { BRAND_TYPE } from 'src/shared/constants/brand.constant';
import { USER_ROLE } from 'src/shared/constants/user-role.constant';
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
    const { id, name } = profile;

    let user = await this.authService.findByFacebookUser(id);
    if (!user) {
      // Register new user if not found
      const customer = new RegisterCustomerDto();
      customer.firstName = name.givenName;
      customer.lastName = name.familyName;
      customer.username = id;
      customer.brand = BRAND_TYPE.ANGELS_PIZZA;
      customer.authMethod = AUTH_METHOD.FACEBOOK as any;
      customer.role = USER_ROLE.CUSTOMER as any;
      user = await this.authService.registerCustomer(customer);
    }
    done(null, user);
  }
}
