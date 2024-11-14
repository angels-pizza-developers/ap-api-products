import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import {
  StateTokenPayload,
  TokenPayload,
} from "src/common/interface/payload.tokent.interface";
import { AUTH_TOKENT_TYPE } from "src/shared/constants/auth-token-type.constant";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private getSecret(tokenType: AUTH_TOKENT_TYPE) {
    if (tokenType === AUTH_TOKENT_TYPE.ACCESS) {
      return this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET");
    } else if (tokenType === AUTH_TOKENT_TYPE.REFRESH) {
      return this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET");
    } else if (tokenType === AUTH_TOKENT_TYPE.EMAIL_VERIFICATION) {
      return this.configService.get<string>("JWT_VERIFICATION_TOKEN_SECRET");
    } else if (tokenType === AUTH_TOKENT_TYPE.PERSONAL_ACCESS_TOKEN) {
      return this.configService.get<string>("JWT_PERSONAL_ACCESS_TOKEN_SECRET");
    } else {
      return this.configService.get<string>("JWT_SECRET");
    }
  }

  getTokenDecoded(token: string) {
    return this.jwtService.decode(token) as any; // Type 'any' to avoid strict type checking
  }

  // Login method to create and return JWT
  verifyAccessToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.getSecret(AUTH_TOKENT_TYPE.ACCESS),
    });
  }

  // Login method to create and return JWT
  verifyRefreshToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.getSecret(AUTH_TOKENT_TYPE.REFRESH),
    });
  }

  // Login method to create and return JWT
  verifyEmailVerificationToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.getSecret(AUTH_TOKENT_TYPE.EMAIL_VERIFICATION),
    });
  }

  // Login method to create and return JWT
  verifySocialLoginToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.getSecret(AUTH_TOKENT_TYPE.SOCIAL_LOGIN),
    });
  }

  // Login method to create and return JWT
  verifySocialVerificationToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.getSecret(AUTH_TOKENT_TYPE.SOCIAL_LOGIN),
    });
  }

  // Login method to create and return JWT
  verifyPersonalAccessToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.getSecret(AUTH_TOKENT_TYPE.PERSONAL_ACCESS_TOKEN),
    });
  }

  // Login method to create and return JWT
  generateToken(payload: TokenPayload, expiresIn) {
    const token = this.jwtService.sign(payload, {
      secret: this.getSecret(payload.tokenType),
      expiresIn,
    });
    // Step 2: Decode the token to get its full details (including exp, iat, etc.)
    const decoded = this.getTokenDecoded(token);
    return {
      token,
      decoded,
    };
  }

  // Login method to create and return JWT
  generateStateToken(payload, expiresIn) {
    const token = this.jwtService.sign(payload, {
      secret: this.getSecret(AUTH_TOKENT_TYPE.PERSONAL_ACCESS_TOKEN),
      expiresIn,
    });
    // Step 2: Decode the token to get its full details (including exp, iat, etc.)
    const decoded = this.getTokenDecoded(token);
    return {
      token,
      decoded,
    };
  }
}
