/* eslint-disable @typescript-eslint/no-unused-vars */
// src/auth/google.strategy.ts
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BRAND_TYPE } from "src/shared/constants/brand.constant";
import { AUTH_METHOD } from "src/shared/constants/auth-method.constant";
import { USER_ROLE } from "src/shared/constants/user-role.constant";
import { AuthService } from "../service/auth.service";
import { TokenService } from "../service/token.service";
import { UserAuth } from "src/database/entities/UserAuth";
import { AUTH_EVENT_TYPE } from "src/shared/constants/auth-event-type.constant";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL"),
      passReqToCallback: true, // This allows us to pass the request object to the validate function
      scope: ["email", "profile"],
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { state } = req.query;
    const { emails } = profile;
    const email = emails[0].value; // Get the user's email;
    let userAuth, requestMetadata, _sessionId;
    if (state) {
      try {
        const { providerUserId, data, userId, role, sessionId } =
          this.tokenService.verifySocialVerificationToken(state);
        requestMetadata = data;
        _sessionId = sessionId;

        //check current token auth if valid
        userAuth = await this.authService.validateUserAuth(
          providerUserId,
          AUTH_METHOD.PASSWORD as any,
        );
        if (!userAuth) {
          return done(null, false, false);
        }

        //check if google exist in user auth use profile id
        userAuth = await this.authService.validateUserAuth(
          email,
          AUTH_METHOD.GOOGLE as any,
        );
        if (!userAuth || !(userAuth as UserAuth).isVerified) {
          //create google user
          userAuth = await this.authService.linkSocialAccount(
            userId,
            AUTH_METHOD.GOOGLE,
            email,
          );
        }
      } catch (ex) {
        return done(null, false, false);
      }
    } else {
      userAuth = await this.authService.validateUserAuth(
        email,
        AUTH_METHOD.GOOGLE as any,
      );
      if (!userAuth) {
        return done(null, false, false);
      }
    }

    done(null, {
      userId: userAuth.user.userId,
      providerUserId: userAuth.providerUserId,
      authMethod: AUTH_METHOD.GOOGLE,
      role: USER_ROLE.CUSTOMER,
      sessionId: _sessionId,
      brand: BRAND_TYPE.ANGELS_PIZZA as any,
      requestMetadata,
    });
  }
}
