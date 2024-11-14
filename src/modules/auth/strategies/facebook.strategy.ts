// src/auth/facebook.strategy.ts
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-facebook";
import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AUTH_METHOD } from "src/shared/constants/auth-method.constant";
import { BRAND_TYPE } from "src/shared/constants/brand.constant";
import { USER_ROLE } from "src/shared/constants/user-role.constant";
import { AuthService } from "../service/auth.service";
import { TokenService } from "../service/token.service";
import { UserAuth } from "src/database/entities/UserAuth";
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>("FACEBOOK_CLIENT_ID"),
      clientSecret: configService.get<string>("FACEBOOK_CLIENT_SECRET"),
      callbackURL: configService.get<string>("FACEBOOK_CALLBACK_URL"),
      profileFields: ["id", "emails", "name", "picture"], // Get these fields from Facebook
      passReqToCallback: true, // This allows us to pass the request object to the validate function
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id } = profile;

    const { state } = req.query; // Facebook returns the authorization code and state (linkingToken)
    let userAuth, requestMetadata, _sessionId;
    if (state) {
      // Step 1: Verify the linkingToken (state parameter) to get the original user ID
      try {
        const { providerUserId, data, userId, role, sessionId } =
          this.tokenService.verifySocialVerificationToken(state);
        requestMetadata = data; // This is the user who initiated the linking process
        _sessionId = sessionId;

        //check current token auth if valid
        userAuth = await this.authService.validateUserAuth(
          providerUserId,
          AUTH_METHOD.PASSWORD as any,
        );
        if (!userAuth) {
          return done(null, false, false);
        }

        //check if facebook exist in user auth use profile id
        userAuth = await this.authService.validateUserAuth(
          id,
          AUTH_METHOD.FACEBOOK as any,
        );
        if (!userAuth || !(userAuth as UserAuth).isVerified) {
          //create facebook user
          userAuth = await this.authService.linkSocialAccount(
            userId,
            AUTH_METHOD.FACEBOOK,
            id,
          );
        }
      } catch (err) {
        return done(null, false, false);
      }
    } else {
      userAuth = await this.authService.validateUserAuth(
        id,
        AUTH_METHOD.FACEBOOK as any,
      );
      if (!userAuth) {
        return done(null, false, false);
      }
    }
    done(null, {
      userId: userAuth.user.userId,
      providerUserId: userAuth.providerUserId,
      authMethod: AUTH_METHOD.FACEBOOK,
      role: USER_ROLE.CUSTOMER,
      brand: BRAND_TYPE.ANGELS_PIZZA as any,
      sessionId: _sessionId,
      requestMetadata,
    });
  }
}
