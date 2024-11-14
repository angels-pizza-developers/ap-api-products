// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/modules/user/service/user.service";
import { AuthService } from "../service/auth.service";
import { AUTH_METHOD } from "src/shared/constants/auth-method.constant";
import { BRAND_TYPE } from "src/shared/constants/brand.constant";
import { USER_ROLE } from "src/shared/constants/user-role.constant";
// import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate({ userId, providerUserId, sessionId, exp }) {
    if (!exp) {
      throw new UnauthorizedException("Token does not have an expiration date");
    }
    if (!userId || !providerUserId) {
      throw new UnauthorizedException();
    }
    const userAuth = await this.authService.validateUserAuth(
      providerUserId,
      AUTH_METHOD.PASSWORD as any,
    );
    if (!userAuth) {
      throw new UnauthorizedException();
    }
    return {
      userId: userAuth.user.userId,
      providerUserId: userAuth.providerUserId,
      authMethod: AUTH_METHOD.PASSWORD,
      role: USER_ROLE.CUSTOMER,
      brand: BRAND_TYPE.ANGELS_PIZZA as any,
      sessionId: sessionId,
    };
  }
}
