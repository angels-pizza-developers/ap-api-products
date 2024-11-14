import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
  HttpStatus,
  Query,
  BadGatewayException,
  HttpException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger";
import { FacebookAuthGuard } from "src/common/guards/facebook-auth.guard";
import { GoogleAuthGuard } from "src/common/guards/google-auth.guard";
import { Request, Response } from "express";
import { AuthService } from "./service/auth.service";
import { ApiResponseModel } from "src/common/models/api-response.model";
import { ConfigService } from "@nestjs/config";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from "src/shared/constants/api-response.constant";
import { LogInDto } from "./dto/login.dto";
import { RegisterCustomerUserDto } from "./dto/register.dto";
import { RequestMetadata } from "src/common/decorators/request-metadata.decorator";
import { RequestMetadataModel } from "src/common/models/request-metadata.model";
import { RequestMetadataGuardFactory } from "src/common/factory/request-metadata.factory";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_TOKENT_TYPE } from "src/shared/constants/auth-token-type.constant";
import { VERIFICATION_ERROR_FAILED_INVALID } from "src/shared/constants/auth-error.constant";
import { AUTH_METHOD } from "src/shared/constants/auth-method.constant";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get("profile")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt")) // This ensures the user must be authenticated with JWT
  async getUserProfile(@Req() req: any, @Res() _res: Response) {
    const res: ApiResponseModel<any> = {} as any;
    try {
      if (!req.user || !req.user?.userId) {
        return _res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Invalid access token" });
      }
      res.data = await this.authService.getProfile(req.user?.userId);
      res.success = true;
      return _res.status(HttpStatus.OK).json(res);
    } catch (ex) {
      throw ex;
    }
  }

  @Get("link/google")
  @UseGuards(
    RequestMetadataGuardFactory(
      "timezone",
      "user-agent",
      "geolocation",
      "sessionid",
    ),
  )
  @ApiHeader({
    name: "timezone",
    description: "Timezone of the client making the request. ex: Asia/Manila",
    required: true,
  })
  @ApiHeader({
    name: "geolocation",
    description:
      "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
    required: true,
  })
  @ApiHeader({
    name: "sessionId",
    description: "SessionId of the client making the request. ex: Device UUID",
    required: true,
  })
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt")) // This ensures the user must be authenticated with JWT
  async linkGoogle(
    @Res() res: Response,
    @Req() req,
    @RequestMetadata(["timezone", "user-agent", "geolocation", "sessionId"])
    requestMetadata: RequestMetadataModel,
  ) {
    // Generate a token that includes the current user's ID
    const linkingToken = await this.authService.generateAuthToken(
      req.user,
      requestMetadata,
      AUTH_TOKENT_TYPE.SOCIAL_LOGIN,
      this.configService.get<string>("AUTH_VERIFY_TOKEN_EXPIRE"),
      requestMetadata,
    );

    // Redirect to Google login, passing the linkingToken as a query parameter
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.configService.get<string>("GOOGLE_CLIENT_ID")}&redirect_uri=http://localhost:3000/auth/google/callback&response_type=code&scope=openid%20profile%20email&state=${linkingToken}`;

    return res.redirect(googleAuthUrl);
  }

  // Social Login (Google)
  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // Initiates the Google OAuth2 login flow
  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(
    @Req() req,
    @Res() res,
    @RequestMetadata()
    requestMetadata: RequestMetadataModel,
  ) {
    if (!req.user) {
      console.log(req.authInfo);
      res.location(
        `${this.configService.get<string>("AUTH_CLIENT_ERROR_CALL_BACK")}/?error=NOT_LINKED&auth=google`,
      );
      res.redirect(
        `${this.configService.get<string>("AUTH_CLIENT_ERROR_CALL_BACK")}/?error=NOT_LINKED&auth=google`,
      );
    } else {
      const { accessToken, refreshToken } =
        await this.authService.confirmSocialLogin(
          req.user,
          AUTH_METHOD.GOOGLE,
          {
            ...requestMetadata,
            ...req.user.requestMetadata,
            ...req.query,
          },
        );
      res.location(
        `${this.configService.get<string>("AUTH_CLIENT_SUCCESS_CALL_BACK")}/?accessToken=${accessToken}&refreshToken=${refreshToken}`,
      );
      res.redirect(
        `${this.configService.get<string>("AUTH_CLIENT_SUCCESS_CALL_BACK")}/?accessToken=${accessToken}&refreshToken=${refreshToken}`,
      );
    }
  }

  @Get("link/facebook")
  @UseGuards(
    RequestMetadataGuardFactory(
      "timezone",
      "user-agent",
      "geolocation",
      "sessionid",
    ),
  )
  @ApiHeader({
    name: "timezone",
    description: "Timezone of the client making the request. ex: Asia/Manila",
    required: true,
  })
  @ApiHeader({
    name: "geolocation",
    description:
      "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
    required: true,
  })
  @ApiHeader({
    name: "sessionId",
    description: "SessionId of the client making the request. ex: Device UUID",
    required: true,
  })
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt")) // This ensures the user must be authenticated with JWT
  async linkFacebook(
    @Res() res: Response,
    @Req() req,
    @RequestMetadata(["timezone", "user-agent", "geolocation", "sessionId"])
    requestMetadata: RequestMetadataModel,
  ) {
    // Generate a token that includes the current user's ID
    const linkingToken = await this.authService.generateAuthToken(
      req.user,
      requestMetadata,
      AUTH_TOKENT_TYPE.SOCIAL_LOGIN,
      this.configService.get<string>("AUTH_VERIFY_TOKEN_EXPIRE"),
      requestMetadata,
    );

    // Redirect to Facebook lo  gin, passing the linkingToken as a query parameter
    const facebookAuthUrl = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${this.configService.get<string>("FACEBOOK_CLIENT_ID")}&redirect_uri=http://localhost:3000/auth/facebook/callback&state=${linkingToken}`;
    return res.redirect(facebookAuthUrl);
  }

  // Social Login (Facebook)
  @Get("facebook")
  @UseGuards(FacebookAuthGuard)
  async facebookLogin() {
    // Initiates the Facebook login flow
  }

  @Get("facebook/callback")
  @UseGuards(FacebookAuthGuard)
  async facebookLoginCallback(
    @Req() req,
    @Res() res: Response,
    @RequestMetadata()
    requestMetadata: RequestMetadataModel,
  ) {
    if (!req.user) {
      console.log(req.authInfo);
      // const redirectUrl = new URL(
      //   `${this.configService.get<string>('AUTH_CLIENT_ERROR_CALL_BACK')}/facebook-verification/fail/NOT_LINKED`,
      // );
      res.location(
        `${this.configService.get<string>("AUTH_CLIENT_ERROR_CALL_BACK")}/?error=NOT_LINKED&auth=facebook`,
      );
      res.redirect(
        `${this.configService.get<string>("AUTH_CLIENT_ERROR_CALL_BACK")}/?error=NOT_LINKED&auth=facebook`,
      );
    } else {
      const { accessToken, refreshToken } =
        await this.authService.confirmSocialLogin(
          req.user,
          AUTH_METHOD.FACEBOOK,
          {
            ...requestMetadata,
            ...req.user.requestMetadata,
            ...req.query,
          },
        );
      res.location(
        `${this.configService.get<string>("AUTH_CLIENT_SUCCESS_CALL_BACK")}/?accessToken=${accessToken}&refreshToken=${refreshToken}`,
      );
      res.redirect(
        `${this.configService.get<string>("AUTH_CLIENT_SUCCESS_CALL_BACK")}/?accessToken=${accessToken}&refreshToken=${refreshToken}`,
      );
    }
  }

  @Post("login")
  @UseGuards(
    RequestMetadataGuardFactory(
      "timezone",
      "user-agent",
      "geolocation",
      "role",
      "sessionId",
    ),
  )
  @ApiHeader({
    name: "timezone",
    description: "Timezone of the client making the request. ex: Asia/Manila",
    required: true,
  })
  @ApiHeader({
    name: "geolocation",
    description:
      "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
    required: true,
  })
  @ApiHeader({
    name: "role",
    description: "Role of the client making the request. ex: CUSTOMER",
    required: true,
  })
  @ApiHeader({
    name: "sessionId",
    description: "SessionId of the client making the request. ex: Device UUID",
    required: true,
  })
  async login(
    @RequestMetadata([
      "timezone",
      "user-agent",
      "geolocation",
      "role",
      "sessionId",
    ])
    requestMetadata: RequestMetadataModel,
    @Body()
    dto: LogInDto,
  ) {
    try {
      return await this.authService.validateUserCredentials(dto, requestMetadata);
    } catch(ex) {
      throw ex;
    }
  }

  @Post("register_customer")
  @UseGuards(
    RequestMetadataGuardFactory("timezone", "user-agent", "geolocation"),
  )
  @ApiHeader({
    name: "timezone",
    description: "Timezone of the client making the request. ex: Asia/Manila",
    required: true,
  })
  @ApiHeader({
    name: "geolocation",
    description:
      "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
    required: true,
  })
  @ApiHeader({
    name: "sessionId",
    description: "SessionId of the client making the request. ex: Device UUID",
    required: true,
  })
  async registerCustomer(
    @RequestMetadata(["timezone", "user-agent", "geolocation"])
    requestMetadata: RequestMetadataModel,
    @Body()
    dto: RegisterCustomerUserDto,
  ) {
    return await this.authService.registerCustomer(dto, requestMetadata);
  }

  @Post("verify_email")
  async verifyEmail(@Req() req: Request, @Res() res: Response) {
    try {
      const { token } = req.body;
      const isValid = await this.authService.validateVerificationToken(token);
      if (isValid) {
        return await this.authService.validateVerificationToken(token);
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: "Unauthorized",
            message: VERIFICATION_ERROR_FAILED_INVALID,
            errorCode: "VERIFICATION_ERROR_FAILED_INVALID",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (ex) {
      throw ex;
    }
  }

  @Post("resend_email_verification")
  @UseGuards(
    RequestMetadataGuardFactory("timezone", "user-agent", "geolocation"),
  )
  @ApiHeader({
    name: "timezone",
    description: "Timezone of the client making the request. ex: Asia/Manila",
    required: true,
  })
  @ApiHeader({
    name: "geolocation",
    description:
      "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
    required: true,
  })
  @ApiHeader({
    name: "sessionId",
    description: "SessionId of the client making the request. ex: Device UUID",
    required: true,
  })
  async resendEmailVerification(
    @Req() req: Request,
    @Res() _res: Response,
    @RequestMetadata(["timezone", "user-agent", "geolocation", "sessionId"])
    requestMetadata: RequestMetadataModel,
  ) {
    const res: ApiResponseModel<any> = {} as any;
    const { providerUser } = req.body;
    try {
      res.data = await this.authService.resendEmailVerification(
        providerUser,
        requestMetadata,
      );
      res.success = true;
      return _res.status(HttpStatus.OK).json(res);
    } catch (ex) {
      throw ex;
    }
  }

  @Post("refresh_token")
  async refreshToken(@Req() req: Request, @Res() _res: Response) {
    const res: ApiResponseModel<any> = {} as any;
    let refreshToken = req.cookies["refreshToken"];
    const { userId, sessionId } = req.body;
    if (!refreshToken) {
      refreshToken = req.body.refreshToken;
    }

    if (!refreshToken) {
      return _res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "No refresh token" });
    }

    try {
      res.data = await this.authService.refreshToken(
        refreshToken,
        userId,
        sessionId,
      );
      _res.cookie("refreshToken", res.data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.success = true;
      return res;
    } catch (ex) {
      res.success = false;
      res.message = ex.message !== undefined ? ex.message : ex;
      return _res.status(HttpStatus.FORBIDDEN).json(res);
    }
  }

  @Post("logout")
  @UseGuards(
    RequestMetadataGuardFactory("timezone", "user-agent", "geolocation"),
  )
  @ApiHeader({
    name: "timezone",
    description: "Timezone of the client making the request. ex: Asia/Manila",
    required: true,
  })
  @ApiHeader({
    name: "geolocation",
    description:
      "Geolocation of the client making the request. format: lat,lng. ex: 12345.6780,9876.5431",
    required: true,
  })
  async logout(@Req() req: Request, @Res() res: Response) {
    const { userId, sessionId } = req.body;
    try {
      await this.authService.logOut(userId, sessionId);

      res.clearCookie("refreshToken");
      return res
        .status(HttpStatus.OK)
        .json({ message: "Logged out successfully" });
    } catch (ex) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Invalid refresh token" });
    }
  }
}
